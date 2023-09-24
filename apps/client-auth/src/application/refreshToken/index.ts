import { RefreshTokenCommand } from './RefreshTokenCommand'

export class RefreshToken {
  twitchRepository: Dependencies['twitchRepository']

  constructor({ twitchRepository }: Pick<Dependencies, 'twitchRepository'>) {
    this.twitchRepository = twitchRepository
  }

  async execute({ code }: RefreshTokenCommand) {
    return await this.twitchRepository.refreshToken({ code })
  }
}