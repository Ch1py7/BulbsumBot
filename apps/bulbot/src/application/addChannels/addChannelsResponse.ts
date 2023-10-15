import { AddChannelResponseConstructor } from 'application/types/AddChannelConstructor'

export class AddChannelResponse {
  response: string

  constructor({ response }: AddChannelResponseConstructor) {
    this.response = response
  }
}