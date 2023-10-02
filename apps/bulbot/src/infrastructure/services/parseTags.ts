import { DictEmotes, ParsedTags, TagList } from '../types/ParseMessage'

export class ParseTags {
  execute(tags: string) {
    const tagsToIgnore: Record<string, string | null> = {  
      'client-nonce': null,
      'flags': null
    }

    const dictParsedTags: ParsedTags = {} as ParsedTags
    const parsedTags = tags.split(';') 

    parsedTags.forEach(tag => {
      const parsedTag = tag.split('=') as [TagList, string]
      const tagValue = parsedTag[1] === '' ? null : parsedTag[1]

      if (parsedTag[0] === 'badge-info' || parsedTag[0] === 'badges') {
        if (tagValue) {
          const dict: { [key: string]: string } = {}
          const badges = tagValue.split(',')
          badges.forEach(badge => {
            const badgeParts = badge.split('/')
            dict[badgeParts[0]] = badgeParts[1]
          })
          dictParsedTags[parsedTag[0]] = dict
        } else {
          dictParsedTags[parsedTag[0]] = null
        }
      } else if (parsedTag[0] === 'emotes') {
        if (tagValue) {
          const dictEmotes: DictEmotes = {}
          const emotes = tagValue.split('/')
          emotes.forEach(emote => {
            const emoteParts = emote.split(':')
            const textPositions: Record<'startPosition' | 'endPosition', string>[] = []
            const positions = emoteParts[1].split(',')
            positions.forEach(position => {
              const positionParts = position.split('-')
              textPositions.push({
                startPosition: positionParts[0],
                endPosition: positionParts[1]
              })
            })
            dictEmotes[emoteParts[0]] = textPositions
          })
          dictParsedTags[parsedTag[0]] = dictEmotes
        } else {
          dictParsedTags[parsedTag[0]] = null
        }
      } else if (parsedTag[0] === 'emote-sets') {
        if (tagValue) {
          const emoteSetIds = tagValue.split(',')
          dictParsedTags[parsedTag[0]] = emoteSetIds
        } else {
          dictParsedTags[parsedTag[0]] = null
        }
      } else if (Object.prototype.hasOwnProperty.call(tagsToIgnore, parsedTag[0])) {
        return 0
      } else  {
        if (tagValue) {
          const value = tagValue.split(',')
          dictParsedTags[parsedTag[0]] = value[0]
        } else {
          dictParsedTags[parsedTag[0]] = null
        }
      }
    })
    return dictParsedTags
  }
}
