import { FC, ReactElement, useEffect, useState } from 'react'
import { authURL } from 'services/authURL'

export const Home: FC = (): ReactElement => {
  const [authCode, setAuthCode] = useState<string>('')
  const { search } = window.location
  const url = authURL()

  useEffect(() => {
    if (search) {
      const token = search.replace(/\?code=|&scope=.*/g, '')
      setAuthCode(token)
    }
  }, [])

  return (
    <>
      {authCode}
      <a href={url}>get access</a>
    </>
  )
}