import 'module-alias/register'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import express from 'express'

import { router as bulbot } from 'infrastructure/http/bulbotController'
import { container } from 'src/container'

const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/bulbot', bulbot)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

const twitchBot = container.resolve('twitchBot')

twitchBot.connect()
