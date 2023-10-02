import { ParsedCommand } from '../types/ParseMessage'

export class ParseCommand {
  execute(rawCommand: string) {
    const commandParts = rawCommand.split(' ')
    const numericMessages = ['002', '003', '004', '353', '366', '372', '375', '376']

    const parsers: { [key: string]: (parts: string[]) => ParsedCommand } = {
      CAP: (parts: string[]) => {
        return {
          command: parts[0],
          isCapRequestEnabled: parts[2] === 'ACK' ? true : false,
        }
      },
      PING: (parts: string[]) => {
        return { command: parts[0] }
      },
      GLOBALUSERSTATE: (parts: string[]) => {
        return { command: parts[0] }
      },
      RECONNECT: (parts: string[]) => {
        return { command: parts[0] }
      }
    }

    const commandType = parsers[commandParts[0]]
    if (commandType) {
      return commandType(commandParts)
    }

    if (numericMessages.includes(commandParts[0])) {
      console.log(`numeric message: ${commandParts[0]}`)
      return null
    }

    return {
      command: commandParts[0],
      channel: commandParts[1]
    }
  }
}
