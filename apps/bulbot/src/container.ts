import { InjectionMode, asClass, asValue, createContainer } from 'awilix'

// Use cases
import { GetAccountInfo } from 'application/getAccountInfo'
import { GetOAuthToken } from 'application/getOAuthToken'
import { AddChannels } from 'src/application/addChannels'

// Persistance
import { BaseRepository } from 'infrastructure/persistance/firebase/common/baseRepository'
import { DbHandler } from 'infrastructure/persistance/firebase/dbHandler'
import { TwitchRepository } from 'infrastructure/persistance/twitch/twitchRepository'

// Infrastructure config
import { firebaseConfig, twitchBotConfig } from 'infrastructure/config'
import { TwitchClient } from 'infrastructure/irc/twitchBot'

// Services
import { AxiosHttpClient } from 'infrastructure/services'

// Libraries
import axios from 'axios'
import admin from 'firebase-admin'
import socketio from 'socket.io'

export const container = createContainer<Dependencies>({
  injectionMode: InjectionMode.PROXY,
})

container.register({
  // Use cases
  getAccountInfo: asClass(GetAccountInfo),
  getOAuthToken: asClass(GetOAuthToken),
  addChannels: asClass(AddChannels),

  // Infrastructure config
  firebaseConfig: asValue(firebaseConfig),
  twitchBotConfig: asValue(twitchBotConfig),
  twitchClient: asClass(TwitchClient),

  // Persistance
  twitchRepository: asClass(TwitchRepository),
  dbHandler: asClass(DbHandler).singleton(),
  baseRepository: asClass(BaseRepository),

  // Services
  AxiosClient: asClass(AxiosHttpClient),

  // Libraries
  admin: asValue(admin),
  axios: asValue(axios),
  socketIo: asValue(socketio),
})
