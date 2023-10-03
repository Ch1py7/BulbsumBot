import { ParsedMessage } from 'infrastructure/types/ParseMessage'
import { ParseCommand, ParseParameters, ParseSource, ParseTags } from './index'

export class ParseMessage {
  idx = 0
  rawTagsComponent: string | null = null
  rawSourceComponent: string | null = null
  rawCommandComponent: string | null = null
  rawParametersComponent: string | null = null
  parsedMessage: ParsedMessage = {} as ParsedMessage

  execute(messageToParse: Dependencies['message']) {
    let idx = this.idx
    let rawTagsComponent = this.rawTagsComponent
    let rawSourceComponent = this.rawSourceComponent
    let rawCommandComponent = this.rawCommandComponent
    let rawParametersComponent = this.rawParametersComponent
    const parsedMessage = this.parsedMessage

    if (messageToParse.type === 'utf8') {
      const message = messageToParse.utf8Data
      if (message[idx] === '@') {
        const endIdx = message.indexOf(' ')
        rawTagsComponent = message.slice(1, endIdx)
        idx = endIdx + 1
      }

      if (message[idx] === ':') {
        idx += 1
        const endIdx = message.indexOf(' ', idx)
        rawSourceComponent = message.slice(idx, endIdx)
        idx = endIdx + 1
      }

      let endIdx = message.indexOf(':', idx)
      if (-1 == endIdx) {
        endIdx = message.length
      }

      rawCommandComponent = message.slice(idx, endIdx).trim()

      if (endIdx != message.length) {
        idx = endIdx + 1
        rawParametersComponent = message.slice(idx)
      }

      parsedMessage.command = new ParseCommand().execute(rawCommandComponent) // new this.parseCommand(rawCommandComponent).execute()

      if (parsedMessage.command === null) {
        return null 
      } else {
        if (null != rawTagsComponent) {
          parsedMessage.tags = new ParseTags().execute(rawTagsComponent)
        }

        parsedMessage.source = new ParseSource().execute(rawSourceComponent) // new ParseSource(rawSourceComponent).execute()

        parsedMessage.parameters = rawParametersComponent
        if (rawParametersComponent && rawParametersComponent[0] === '!') {      
          parsedMessage.command = new ParseParameters().execute(rawParametersComponent, parsedMessage.command)
        }
      }
      return parsedMessage
    } else {
      return null
    }
  }
}
