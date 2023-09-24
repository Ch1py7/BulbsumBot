import { GetAccountInfoCommand } from './getAccountInfoCommand'

export class GetAccountInfo {
  twitchRepository: Dependencies['twitchRepository']

  constructor({ twitchRepository }: Pick<Dependencies, 'twitchRepository'>) {
    this.twitchRepository = twitchRepository
  }

  async execute({ token }: GetAccountInfoCommand) {
    return await this.twitchRepository.getAccountInfo({ token })
  }
}