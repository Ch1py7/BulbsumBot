import { AddChannelCommand } from './addChannelsCommand'
import { AddChannelResponse } from './addChannelsResponse'

export class AddChannels {
  private _baseRepository: Dependencies['baseRepository']

  constructor({ baseRepository }: Pick<Dependencies, 'baseRepository'>) {
    this._baseRepository = baseRepository
  }

  public async execute({ channel }: AddChannelCommand) {
    const response = await this._baseRepository.addChannel(channel)
    if (response) {
      return new AddChannelResponse({response})
    }
  }
}