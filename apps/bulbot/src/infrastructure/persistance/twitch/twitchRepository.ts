import { GetAccountInfo, GetAccountInfoResponse, GetOAuthToken, RefreshToken, GetOAuthTokenResponse, RefreshTokenResponse } from 'infrastructure/types/TwitchRepository'

export class TwitchRepository {
  private _TWITCH_URL = 'https://id.twitch.tv/oauth2'
  private _axios: Dependencies['axios']
  private _config: Dependencies['config']
  private _token: string
  private _account_id: string

  constructor({ axios, config }: Pick<Dependencies, 'axios' | 'config'>, token: string, account_id: string) {
    this._axios = axios
    this._config = config
    this._account_id = account_id
    this._token = token
  }

  async getAccountInfo({ token }: GetAccountInfo) {
    const { data } = await this._axios.get<GetAccountInfoResponse>(`${this._TWITCH_URL}/validate`, {
      headers: {
        Authorization: `OAuth ${token}`
      }
    })
    return data
  }

  async getOAuthToken({ code }: GetOAuthToken) {
    const { bot_client_id, bot_secret } = this._config
    try {
      const { data } = await this._axios.post<GetOAuthTokenResponse>(`${this._TWITCH_URL}/token`, null, {
        params: {
          client_id: bot_client_id,
          client_secret: bot_secret,
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: 'http://localhost:5173/oauth'
        }
      })
      return data
    } catch (error) {
      console.error('Error fetching OAuth token:', error)
      throw error
    }
  }

  async refreshToken({ code }: RefreshToken) {
    const { data } = await this._axios.post<RefreshTokenResponse>(`${this._TWITCH_URL}/token`, {
      client_id: this._config.bot_client_id,
      client_secret: this._config.bot_secret,
      code: code,
      grant_type: 'refresh_token',  
    })

    return data
  }

  authURL() {
    const url = new URL(`${this._TWITCH_URL}/authorize`)
    url.searchParams.set('client_id', this._config.bot_client_id!)
    url.searchParams.set('response_type', 'token')
    url.searchParams.set('scope', 'openid channel:manage:vips moderator:manage:banned_users')
    url.searchParams.set('redirect_uri', location.origin + '/oauth')
    return url.href
  }
}
