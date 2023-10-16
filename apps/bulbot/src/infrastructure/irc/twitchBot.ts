import { RefreshingAuthProvider } from '@twurple/auth'
import { ChatClient, ChatMessage } from '@twurple/chat'
import { TokenCache } from 'infrastructure/services/tokenCache'

export class TwitchClient {
  private _chatClient: ChatClient
  private _tokenCache: TokenCache
  private _authProvider: RefreshingAuthProvider
  private _baseRepository: Dependencies['baseRepository']

  constructor({ baseRepository, twitchBotConfig }: Pick<Dependencies, 'baseRepository' | 'twitchBotConfig'>) {
    this._baseRepository = baseRepository
    this._tokenCache = new TokenCache(twitchBotConfig.initialToken, twitchBotConfig.initialRefreshToken)
    this._authProvider = new RefreshingAuthProvider({
      clientId: twitchBotConfig.clientId!,
      clientSecret: twitchBotConfig.clientSecret!,
    })

    const getChannels = async () => {
      const channels = await this._baseRepository.getChannels()
      return channels ?? []
    }

    this._chatClient = new ChatClient({
      authProvider: this._authProvider,
      channels: getChannels
    })
  }

  private _initializeAuthenticationAndChat = async() => {
    this._authProvider.onRefresh((_, newToken) => {
      this._tokenCache.writeToken({
        accessToken: newToken.accessToken,
        expiresIn: newToken.expiresIn ?? 0,
        obtainedAt: newToken.obtainmentTimestamp,
        refreshToken: newToken.refreshToken,
      })
    })
    await this._authProvider.addUserForToken({
      expiresIn: this._tokenCache.current.expiresIn,
      obtainmentTimestamp: this._tokenCache.current.obtainedAt,
      refreshToken: this._tokenCache.current.refreshToken,
      accessToken: this._tokenCache.current.accessToken,
      scope: ['chat:read', 'chat:edit'],
    }, ['chat'])
    this._chatClient.connect()
  }
  
  private _configureChatClientEventHandlers() {
    this._chatClient.onAuthenticationFailure(() => {
      console.error('Unable to authenticate with twitch chat')
    })
    this._chatClient.onJoinFailure(console.error)
    this._chatClient.onJoinFailure((channel, reason) => {
      console.error(`Unable to join channel:${channel} reason: ${reason}`)
    })
    this._chatClient.onDisconnect((manually) => {
      if (manually) {
        console.log(`left channel, connections: ${this._chatClient.currentChannels}`)
      }
    })
    this._chatClient.onMessage(this._onMessage)
  }

  // TODO: send the data
  private _onMessage = async (channel: string, user: string, message: string, msgData: ChatMessage) => {
    console.log(msgData)
    console.log(message)
  }

  public connection() {
    this._initializeAuthenticationAndChat()
    this._configureChatClientEventHandlers()
  }
}
