import { FirebaseHandler } from '@snowdrive/firebase-handler'

export class DbHandler {
  private _admin: Dependencies['admin']
  private _config: Dependencies['firebaseConfig']

  private _instance: FirebaseHandler | undefined

  constructor({ admin, firebaseConfig }: Pick<Dependencies, 'admin' | 'firebaseConfig'>) {
    this._admin = admin
    this._config = firebaseConfig
  }

  private _connect() {
    const admin = this._admin
    try {
      const dbHandler = new FirebaseHandler({
        admin,
        logger: {
          info: (message, error) => {
            if (!error) {
              console.log(message)
            } else {
              console.log(error)
            }
            console.log(message)
          },
          error: (message, error) => {
            if (!error) {
              console.log(message)
            } else {
              console.log(error)
            }
            console.log(message)
          }
        },
        config: {
          firebase: {
            databaseURL: this._config.databaseURL,
            credential: {
              serviceAccount: this._config.credential
            }
          }
        }
      })
      return dbHandler
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message)
      }
      console.error(error)
    }
  }

  private _createInstance() {
    return this._connect()
  }

  public getInstance() {
    if (!this._instance) {
      this._instance = this._createInstance()
    }
    return this._instance
  }
}