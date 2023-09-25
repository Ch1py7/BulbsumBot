export class TwitchBot {
  config: Dependencies['config']
  websocket: Dependencies['websocket']

  constructor({ config, websocket }: Pick<Dependencies, 'config' | 'websocket'>) {
    this.config = config
    this.websocket = websocket
  }

  chatReader() {
    const client = new this.websocket.client()
    const { account, channel, password } = this.config
    
    client.on('connectFailed', function(error: Error) {
      console.log('Connect Error: ' + error.toString())
    })

    client.on('connect', function(connection) {
      console.log(`Bot Connected in ${channel}`)

      connection.sendUTF('CAP REQ :twitch.tv/membership twitch.tv/tags twitch.tv/commands')
      connection.sendUTF(`PASS oauth:${password}`)
      connection.sendUTF(`NICK ${account}`)

      connection.sendUTF(`JOIN ${channel}`)

      connection.on('message', function (ircMessage) {
        console.log(ircMessage)
      })
    })

    client.connect('ws://irc-ws.chat.twitch.tv:80')
  }

  connect() {
    this.chatReader()
  }
}
