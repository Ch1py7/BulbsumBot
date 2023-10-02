// Command Part
type CommandType =
  | 'CAP'
  | 'CLEARCHAT'
  | 'CLEARMSG'
  | 'HOSTTARGET'
  | 'NOTICE'
  | 'PING'
  | 'GLOBALUSERSTATE'
  | 'RECONNECT'
  | 'ROOMSTATE'
  | 'USERNOTICE'
  | 'USERSTATE'
  | 'WHISPER'
  | 'JOIN'
  | 'PART'
  | 'PRIVMSG'
  | '421'
  | '001'
  | '002'
  | '003'
  | '004'
  | '353'
  | '366'
  | '372'
  | '375'
  | '376'

export interface ParsedCommand {
  command: CommandType | string |  null
  channel?: string
  isCapRequestEnabled?: boolean
  botCommand?: string
  botCommandParams?: string
}

// Source Part
interface ParsedSource {
  nick: string | null
  host: string
}

// Tags Part
export type TagList =
  | 'badge-info'
  | 'badges'
  | 'color'
  | 'display-name'
  | 'emote-only'
  | 'emotes'
  | 'first-msg'
  | 'id'
  | 'mod'
  | 'reply-parent-display-name'
  | 'reply-parent-msg-body'
  | 'reply-parent-msg-id'
  | 'reply-parent-user-id'
  | 'reply-parent-user-login'
  | 'reply-thread-parent-msg-id'
  | 'reply-thread-parent-user-login'
  | 'returning-chatter'
  | 'room-id'
  | 'subscriber'
  | 'tmi-sent-ts'
  | 'turbo'
  | 'user-id'
  | 'user-type'
  | 'vip'
  | 'emote-sets'

export type DictEmotes = { [key: string]: [] | Record<'startPosition' | 'endPosition', string>[] }

export type ParsedTags = Record<TagList,
  | string
  | string []
  | null
  | { [key: string]: string | [] }
  | DictEmotes>


// Parsed Message
export interface ParsedMessage {
  tags: ParsedTags | null
  source: ParsedSource | null
  command: ParsedCommand | null
  parameters: string | null
}