export class TwitchBot {
  websocket: Dependencies['websocket']
  socketIo: Dependencies['socketIo']
  http: Dependencies['http']
  parseMessage: Dependencies['parseMessage']

  constructor({ websocket, socketIo, http, parseMessage }: Pick<Dependencies, 'websocket' | 'socketIo' | 'http' | 'parseMessage'>) {
    this.websocket = websocket
    this.http = http
    this.socketIo = socketIo
    this.parseMessage = parseMessage
  }

  chatReader(login: string, token: string) {
    const client = new this.websocket.client()
    const parser = this.parseMessage

    const { Server } = this.socketIo
    const server = this.http.createServer()
    const io = new Server(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    })

    server.listen(8000)

    client.on('connectFailed', function(error: Error) {
      console.log('Connect Error: ' + error.toString())
    })

    client.on('connect', function(connection) {
      console.log(`Bot Connected in ${login}`)

      connection.sendUTF('CAP REQ :twitch.tv/membership twitch.tv/tags twitch.tv/commands')
      connection.sendUTF(`PASS oauth:${token}`)
      connection.sendUTF(`NICK ${login}`)

      connection.sendUTF(`JOIN #${login}`)

      connection.on('message', function (ircMessage) {
        io.emit('chat', parser.execute(ircMessage))
      })
    })

    client.connect('ws://irc-ws.chat.twitch.tv:80')
  }
}
