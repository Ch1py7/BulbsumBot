import { RefreshTokenConstructor } from 'application/types/RefreshTokenConstructor'

export class RefreshTokenCommand {
  code: string

  constructor({ code }: RefreshTokenConstructor) {
    this.code = code
  }
}
