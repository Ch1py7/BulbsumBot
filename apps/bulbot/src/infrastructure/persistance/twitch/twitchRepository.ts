import {
  GetAccountInfo,
  GetAccountInfoResponse,
  GetOAuthToken,
  GetOAuthTokenResponse
} from 'infrastructure/types/TwitchRepository'

export class TwitchRepository {
  private _TWITCH_URL = 'https://id.twitch.tv/oauth2'
  private _config = {
    bot_client_id: process.env.BOT_CLIENT_ID,
    bot_secret: process.env.BOT_SECRET,
  }

  private _axiosClient: Dependencies['AxiosClient']

  constructor({ AxiosClient }: Pick<Dependencies, 'AxiosClient'>) {
    this._axiosClient = AxiosClient
  }

  async getAccountInfo({ token }: GetAccountInfo) {
    const data = await this._axiosClient.get<GetAccountInfoResponse>({
      url: `${this._TWITCH_URL}/validate`,
      options: {
        headers: {
          Authorization: `OAuth ${token}`
        }
      }
    })
    return data
  }

  async getOAuthToken({ code }: GetOAuthToken) {
    const { bot_client_id, bot_secret } = this._config
    try {
      const data = await this._axiosClient.post<GetOAuthTokenResponse>({
        url: `${this._TWITCH_URL}/token`,
        options: {
          params: {
            client_id: bot_client_id,
            client_secret: bot_secret,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:5173/oauth'
          }
        }})
      return data
    } catch (error) {
      console.error('Error fetching OAuth token:', error)
      throw error
    }
  }
}
