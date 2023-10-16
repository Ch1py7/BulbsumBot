import { GetAccountInfoCommand } from 'application/getAccountInfo/getAccountInfoCommand'
import { GetOAuthTokenCommand } from 'application/getOAuthToken/getOAuthTokenCommand'
import express from 'express'
import { AddChannelCommand } from 'src/application/addChannels/addChannelsCommand'
import { container } from 'src/container'

export const router = express.Router()

router.get('/addChannel',
  async (req: express.Request, res: express.Response) => {
    const { channel } = req.query as { channel: string }

    try {
      const command = new AddChannelCommand({channel})
      const addChannels = container.resolve('addChannels')
      const response = await addChannels.execute(command)
      res.status(200).send(response)
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(409).json({message: error.message})
      }
      res.status(500).send({ message: 'An error occurred while processing your request.' })
      console.error(error)
    }
  }
)

router.get('/getAccountInfo',
  async (req: express.Request, res: express.Response) => {
    const { token } = req.query as { token: string }

    try {
      const command = new GetAccountInfoCommand({ token })
      const getAccountInfo = container.resolve('getAccountInfo')
      const response = await getAccountInfo.execute(command)

      res.status(200).send(response)
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(409).json({message: error.message})
      }
      res.status(500).send({ message: 'An error occurred while processing your request.' })
      console.error(error)
    }
  }
)

router.get('/getOAuthToken',
  async (req: express.Request, res: express.Response) => {
    const { code } = req.query as { code: string }

    try {
      const command = new GetOAuthTokenCommand({ code })
      const getOAuthToken = container.resolve('getOAuthToken')
      const response = await getOAuthToken.execute(command)

      res.status(200).send(response)
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(409).json({message: error.message})
      }
      res.status(500).send({ message: 'An error occurred while processing your request.' })
      console.error(error)
    }
  }
)
