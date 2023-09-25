import type { TwitchBot } from 'infrastructure/irc/twitchBot'
import type { config } from 'infrastructure/config/index'
import type websocket from 'websocket'
import type axios from 'axios'
import type { GetAccountInfo } from 'application/getAccountInfo'
import type { GetOAuthToken } from 'application/getOAuthToken'
import type { RefreshToken } from 'application/refreshToken'
import type { TwitchRepository } from 'infrastructure/persistance/twitch/twitchRepository'

declare global {
  interface Dependencies {
    // Use cases
    getAccountInfo: GetAccountInfo
    getOAuthToken: GetOAuthToken
    refreshToken: RefreshToken
  
    // Persistance
    twitchBot: TwitchBot
    config: typeof config
    twitchRepository: TwitchRepository
  
    // Libraries
    websocket: typeof websocket
    axios: typeof axios
  }
}
