import { InjectionMode, asClass, asValue, createContainer } from 'awilix'
// Use cases
import { GetAccountInfo } from 'application/getAccountInfo'
import { GetOAuthToken } from 'application/getOAuthToken'
import { RefreshToken } from 'application/refreshToken'
// Infrastructure config
import { config } from 'infrastructure/config'
// Persistance
import { TwitchBot } from 'infrastructure/irc/twitchBot'
import { TwitchRepository } from 'infrastructure/persistance/twitch/twitchRepository'
import { FirebaseHandler } from 'infrastructure/persistance/firebase/dbHandler'
// Services
import { ParseMessage } from 'infrastructure/services'
// Libraries
import admin from 'firebase-admin'
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

  // Infrastructure config
  config: asValue(config),

  // Persistance
  twitchBot: asClass(TwitchBot),
  twitchRepository: asClass(TwitchRepository),
  dbHandler: asClass(FirebaseHandler),

  // Services
  parseMessage: asClass(ParseMessage),

  // Libraries
  admin: asValue(admin),
  websocket: asValue(websocket),
  axios: asValue(axios),
  socketIo: asValue(socketio),
  http: asValue(http)
})
