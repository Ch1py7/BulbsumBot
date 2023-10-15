import { AddChannelCommandConstructor } from 'application/types/AddChannelConstructor'

export class AddChannelCommand {
  channel: string

  constructor({ channel }: AddChannelCommandConstructor) {
    this.channel = channel
  }
}