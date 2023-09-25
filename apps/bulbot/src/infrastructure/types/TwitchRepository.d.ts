export interface GetAccountInfo {
  token: string
}

export interface GetAccountInfoResponse {
  client_id: string
  login: string
  user_id: number
}

export interface GetOAuthToken {
  code: string
}

export interface GetOAuthTokenResponse {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: Array<string>
  token_type: string
}

export interface RefreshToken {
  code: string
}

export interface RefreshTokenResponse {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: Array<string>
  token_type: string
}
