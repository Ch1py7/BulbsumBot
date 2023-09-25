import { GetAccountInfoCommand } from './getAccountInfoCommand'
import { GetAccountInfoResponse } from './getAccountInfoResponse'

export class GetAccountInfo {
  twitchRepository: Dependencies['twitchRepository']

  constructor({ twitchRepository }: Pick<Dependencies, 'twitchRepository'>) {
    this.twitchRepository = twitchRepository
  }

  async execute({ token }: GetAccountInfoCommand) {
    const response = await this.twitchRepository.getAccountInfo({ token })
    return new GetAccountInfoResponse(response)
  }
}
