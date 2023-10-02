import { InjectionMode, asClass, asValue, createContainer } from 'awilix'
// Use cases
import { GetAccountInfo } from 'application/getAccountInfo'
import { GetOAuthToken } from 'application/getOAuthToken'
import { RefreshToken } from 'application/refreshToken'
// Persistance
import { TwitchBot } from 'infrastructure/irc/twitchBot'
import { TwitchRepository } from 'infrastructure/persistance/twitch/twitchRepository'
// Services
import { ParseCommand, ParseMessage, ParseParameters, ParseSource, ParseTags } from 'infrastructure/services'
// Libraries
import websocket from 'websocket'
import axios from 'axios'
import socketio from 'socket.io'
import http from 'http'

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
  parseCommand: asClass(ParseCommand),
  parseMessage: asClass(ParseMessage),
  parseParameters: asClass(ParseParameters),
  parseSource: asClass(ParseSource),
  parseTags: asClass(ParseTags),

  // Libraries
  websocket: asValue(websocket),
  axios: asValue(axios),
  socketIo: asValue(socketio),
  http: asValue(http)
})
