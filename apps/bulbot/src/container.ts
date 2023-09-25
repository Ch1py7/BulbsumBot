import { InjectionMode, asClass, asValue, createContainer } from 'awilix'
import { config } from 'infrastructure/config'
import { TwitchBot } from 'infrastructure/irc/twitchBot'
import * as websocket from 'websocket'
import axios from 'axios'
import { GetAccountInfo } from 'application/getAccountInfo'
import { GetOAuthToken } from 'application/getOAuthToken'
import { RefreshToken } from 'application/refreshToken'
import { TwitchRepository } from 'infrastructure/persistance/twitch/twitchRepository'

export const container = createContainer<Dependencies>({
  injectionMode: InjectionMode.PROXY,
})

container.register({
  // Use cases
  getAccountInfo: asClass(GetAccountInfo),
  getOAuthToken: asClass(GetOAuthToken),
  refreshToken: asClass(RefreshToken),

  // Persistance
  twitchBot: asClass(TwitchBot),
  config: asValue(config),
  twitchRepository: asClass(TwitchRepository),

  // Libraries
  websocket: asValue(websocket),
  axios: asValue(axios),
})
