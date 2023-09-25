import { GetOAuthTokenCommandConstructor } from 'application/types/GetOAuthTokenConstructor'

export class GetOAuthTokenCommand {
  code: string

  constructor({ code }: GetOAuthTokenCommandConstructor) {
    this.code = code
  }
}
