import { GetAccountInfoCommand } from 'application/getAccountInfo/getAccountInfoCommand'
import { GetOAuthTokenCommand } from 'application/getOAuthToken/getOAuthTokenCommand'
import { RefreshTokenCommand } from 'application/refreshToken/RefreshTokenCommand'
import express from 'express'
import { container } from 'src/container'

export const router = express.Router()

router.get('/getAccountInfo',
  async (req: express.Request, res: express.Response) => {
    const { code } = req.query

    try {
      const token = code as string
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
    const { token } = req.query

    try {
      const code = token as string
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

router.get('/refreshToken',
  async (req: express.Request, res: express.Response) => {
    const { code } = req.body

    try {
      const command = new RefreshTokenCommand({ code })
      const refreshToken = container.resolve('refreshToken')
      const response = refreshToken.execute(command)

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
