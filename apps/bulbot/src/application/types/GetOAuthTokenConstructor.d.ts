export interface GetOAuthTokenCommandConstructor {
  code: string
}

export interface GetOAuthTokenResponseConstructor {
  access_token: string
  refresh_token: string
}
