import {
  ActiveTTS,
  GetAccountInfo,
  GetAccountInfoResponse,
  GetOAuthToken,
  GetOAuthTokenResponse,
  RefreshToken,
  RefreshTokenResponse
} from 'infrastructure/types/TwitchRepository'

export class TwitchRepository {
  private _TWITCH_URL = 'https://id.twitch.tv/oauth2'
  private _axios: Dependencies['axios']
  private _twitchBot: Dependencies['twitchBot']
  private _config = {
    bot_client_id: process.env.BOT_CLIENT_ID,
    bot_secret: process.env.BOT_SECRET,
  }

  constructor({ axios, twitchBot }: Pick<Dependencies, 'axios' | 'twitchBot'>) {
    this._axios = axios
    this._twitchBot = twitchBot
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

  activeTTS({ login, token }: ActiveTTS) {
    this._twitchBot.chatReader(login, token)
  }
}
