import type { TwitchBot } from 'infrastructure/irc/twitchBot'
import type { config } from 'infrastructure/config/index'
import { client } from 'webSocket'
import webSocket from 'webSocket'
import axios from 'axios'
import { GetAccountInfo } from 'application/getAccountInfo'
import { GetOAuthToken } from 'application/getOAuthToken'
import { RefreshToken } from 'application/refreshToken'
import { TwitchRepository } from 'infrastructure/persistance/twitch/twitchRepository'

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
    client: typeof client
    webSocket: typeof webSocket
    axios: typeof axios
  }
}
