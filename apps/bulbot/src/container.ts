import { InjectionMode, asClass, asValue, createContainer } from 'awilix'
// Use cases
import { GetAccountInfo } from 'application/getAccountInfo'
import { GetOAuthToken } from 'application/getOAuthToken'
import { RefreshToken } from 'application/refreshToken'
// Persistance
import { TwitchBot } from 'infrastructure/irc/twitchBot'
import { TwitchRepository } from 'infrastructure/persistance/twitch/twitchRepository'
// Services
import { ParseMessage } from 'infrastructure/services'
// Libraries
import axios from 'axios'
import http from 'http'
import socketio from 'socket.io'
import websocket from 'websocket'

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
  twitchRepository: asClass(TwitchRepository),

  // Services
  parseMessage: asClass(ParseMessage),

  // Libraries
  websocket: asValue(websocket),
  axios: asValue(axios),
  socketIo: asValue(socketio),
  http: asValue(http)
})
