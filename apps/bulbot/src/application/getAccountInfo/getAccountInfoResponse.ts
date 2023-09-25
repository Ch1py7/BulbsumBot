import { GetAccountInfoResponseConstructor } from 'application/types/GetAccountInfoConstructor'

export class GetAccountInfoResponse {
  client_id: string
  login: string
  user_id: number

  constructor({ client_id, login, user_id }: GetAccountInfoResponseConstructor) {
    this.client_id = client_id
    this.login = login
    this.user_id = user_id
  }
}
