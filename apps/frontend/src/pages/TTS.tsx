import { FC, ReactElement, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { msg } from 'types/ParseMessage'

export const TTS: FC = (): ReactElement => {
  const [messages, setMessages] = useState<msg[]>([])

  const bulbotData: {
    token: string
    login: string
    access_token: string
  } = JSON.parse(window.sessionStorage.getItem('bulbot')!)

  console.log(messages)

  useEffect(() => {
    const socket = io('http://localhost:8000')

    socket.connect()

    socket.on(`#${bulbotData.login}`, (arg1: msg) => {
      setMessages(prev => [...prev, arg1])
    })
  }, [])


  return (
    <>
      {messages?.map((message) => <h1>{message.userInfo.message}</h1>)}
    </>
  )
}