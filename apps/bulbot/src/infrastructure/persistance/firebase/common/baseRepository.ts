import { randomUUID } from 'crypto'

export class BaseRepository {
  private _dbHandler: Dependencies['dbHandler']

  constructor({ dbHandler }: Pick<Dependencies, 'dbHandler'>) {
    this._dbHandler = dbHandler
  }

  public async addChannel(channel: string) {
    const response = await this._isChannelExists(channel)
    return response
  }

  public async getChannels() {
    const db = this._dbHandler.getInstance()?.getRealtimeInstance()
    const channelAr: string[] = []
    if (db) {
      try {
        const ref = await db.ref('channels/').once('value')
        ref.forEach(childSnapshot => {
          channelAr.push(childSnapshot.key!)
        })
        return channelAr
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(error.message)
        }
      }
    }
  }

  private async _isChannelExists(channel: string) {
    const channels = await this.getChannels()
    if (channels?.includes(channel)) {
      const response = `${channel} already exists`
      return response
    } else {
      const response = await this._addChannel(channel)
      return response
    }
  }

  private async _addChannel(channel: string) {
    const db = this._dbHandler.getInstance()?.getRealtimeInstance()
    if (db) {
      try {
        await db.ref(`channels/${channel}`).set(randomUUID())
        const response = `'${channel}' channel added`
        return response
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(error.message)
        }
      }
    }
  }
}
