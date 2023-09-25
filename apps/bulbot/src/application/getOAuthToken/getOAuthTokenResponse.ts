import { GetOAuthTokenResponseConstructor } from 'application/types/GetOAuthTokenConstructor'

export class GetOAuthTokenResponse {
  access_token: string
  refresh_token: string

  constructor({ access_token, refresh_token }: GetOAuthTokenResponseConstructor) {
    this.access_token = access_token
    this.refresh_token = refresh_token
  }
}
