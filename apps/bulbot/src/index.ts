import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import 'module-alias/register'
dotenv.config()

import { router as bulbot } from 'infrastructure/http/bulbotController'
import { container } from './container'

const app = express()
const port = process.env.PORT || 8000
const twitchClient = container.resolve('twitchClient')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/bulbot', bulbot)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

twitchClient.connection()
