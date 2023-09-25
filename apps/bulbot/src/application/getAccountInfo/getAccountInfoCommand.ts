import { GetAccountInfoCommandConstructor } from 'src/application/types/GetAccountInfoConstructor'

export class GetAccountInfoCommand {
  token: string

  constructor({ token }: GetAccountInfoCommandConstructor) {
    this.token = token
  }
}
