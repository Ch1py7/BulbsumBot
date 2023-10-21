import { Bulbot } from 'bulbot'
import { FC, ReactElement, useEffect } from 'react'
import { KEY_SESSION_STORAGE } from 'utils'
import { useLocation } from 'wouter'

export const OAuth: FC = (): ReactElement => {
  const [, setLocation] = useLocation()

  
  useEffect(() => {
    const onAuthTwitch = async () => {
      const { search } = window.location
      if (search) {
        const token = search.substring(6, 36)
        const { access_token } = await Bulbot.getOAuthToken(token)
        const { login } = await Bulbot.getAccountInfo(access_token)
        window.sessionStorage.setItem(
          KEY_SESSION_STORAGE,
          JSON.stringify({
            token,
            access_token,
            login
          })
        )
        return setLocation('/tts')
      }
      return setLocation('/')
    }

    onAuthTwitch()
  }, [])
  return (
    <div className='flex flex-col'>
      <h1>cargandooooooo</h1>
    </div>
  )
}