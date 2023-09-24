import { GetOAuthTokenCommand } from './getOAuthTokenCommand'
import { GetOAuthTokenResponse } from './getOAuthTokenResponse'

export class GetOAuthToken {
  twitchRepository: Dependencies['twitchRepository']

  constructor({ twitchRepository }: Pick<Dependencies, 'twitchRepository'>) {
    this.twitchRepository = twitchRepository
  }

  async execute({ code }: GetOAuthTokenCommand) {
    const response = await this.twitchRepository.getOAuthToken({ code })
    return new GetOAuthTokenResponse(response)
  }
}