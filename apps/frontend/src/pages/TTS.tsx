import { FC, ReactElement, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { ParsedMessage } from 'types/ParseMessage'

export const TTS: FC = (): ReactElement => {
  const [message, setMessage] = useState<ParsedMessage | null>(null)

  const bulbotData: {
    token: string
    login: string
    access_token: string
  } = JSON.parse(window.sessionStorage.getItem('bulbot')!)

  useEffect(() => {
    const socket = io('http://localhost:8000/')
    console.log(socket.connect())

    socket.connect()
    socket.on(`#${bulbotData.login}`, (arg1: ParsedMessage) => {
      setMessage(arg1)
    })
  }, [])

  
  return (
    <>
      {message?.parameters}
    </>
  )
}