import { ParsedCommand } from 'infrastructure/types/ParseMessage'

export class ParseParameters {
  execute(rawParametersComponent: string, command: ParsedCommand) {
    const idx = 0
    const commandParts = rawParametersComponent.slice(idx + 1).trim()
    const paramsIdx = commandParts.indexOf(' ')

    if (paramsIdx === -1) {
      command.botCommand = commandParts.slice(0)
    } else {
      command.botCommand = commandParts.slice(0, paramsIdx)
      command.botCommandParams = commandParts.slice(paramsIdx).trim()
    }

    return command
  }
}
