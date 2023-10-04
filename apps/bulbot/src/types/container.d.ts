// Use cases
import type { GetAccountInfo } from 'application/getAccountInfo'
import type { GetOAuthToken } from 'application/getOAuthToken'
import type { RefreshToken } from 'application/refreshToken'
// Persistance
import type { TwitchBot } from 'infrastructure/irc/twitchBot'
import type { TwitchRepository } from 'infrastructure/persistance/twitch/twitchRepository'
import type { FirebaseHandler } from 'src/infrastructure/persistance/firebase/dbHandler'
// Infrastructure
import type { config } from 'infrastructure/config'
// Services
import type { ParseMessage } from 'infrastructure/services'
// Libraries
import type admin from 'firebase-admin'
import type axios from 'axios'
import type http from 'http'
import type socketio from 'socket.io'
import type websocket from 'websocket'
import type { Message } from 'websocket'

declare global {
  interface Dependencies {
    // Use cases
    getAccountInfo: GetAccountInfo
    getOAuthToken: GetOAuthToken
    refreshToken: RefreshToken

    // Infrastructure config
    config: typeof config
  
    // Persistance
    twitchBot: TwitchBot
    twitchRepository: TwitchRepository
    dbHandler: FirebaseHandler

    // Services
    parseMessage: ParseMessage
  
    // Libraries
    admin: typeof admin
    websocket: typeof websocket
    message: Message
    axios: typeof axios
    socketIo: typeof socketio
    http: typeof http
  }
}
