export class TwitchBot {
  config: Dependencies['config']
  client: Dependencies['client']

  constructor({ config, client }: Pick<Dependencies, 'config' | 'client'>) {
    this.config = config
    this.client = client
  }

  chatReader() {
    const client = new this.client({

    })
    const { account, channel, password } = this.config
    
    client.on('connectFailed', function(error) {
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