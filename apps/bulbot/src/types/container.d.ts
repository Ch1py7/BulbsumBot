// Use cases
import type { GetAccountInfo } from 'application/getAccountInfo'
import type { GetOAuthToken } from 'application/getOAuthToken'
import type { AddChannels } from 'src/application/addChannels'

// Persistance
import type { BaseRepository } from 'infrastructure/persistance/firebase/common/baseRepository'
import type { TwitchRepository } from 'infrastructure/persistance/twitch/twitchRepository'
import type { DbHandler } from 'src/infrastructure/persistance/firebase/dbHandler'

// Infrastructure
import type { firebaseConfig, twitchBotConfig } from 'infrastructure/config'
import type { TwitchClient } from 'infrastructure/irc/twitchBot'

// Services
import type { AxiosHttpClient } from 'infrastructure/services'

// Libraries
import type axios from 'axios'
import type admin from 'firebase-admin'
import type socketio from 'socket.io'

declare global {
  interface Dependencies {
    // Use cases
    getAccountInfo: GetAccountInfo
    getOAuthToken: GetOAuthToken
    addChannels: AddChannels

    // Infrastructure config
    firebaseConfig: typeof firebaseConfig
    twitchBotConfig: typeof twitchBotConfig
    twitchClient: TwitchClient

    // Persistance
    twitchRepository: TwitchRepository
    dbHandler: DbHandler
    baseRepository: BaseRepository

    // Services
    AxiosClient: AxiosHttpClient

    // Libraries
    admin: typeof admin
    axios: typeof axios
    socketIo: typeof socketio
  }
}
