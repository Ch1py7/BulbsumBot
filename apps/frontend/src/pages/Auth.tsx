import { FC, ReactElement, useMemo } from 'react'
import { KEY_SESSION_STORAGE as KEY } from 'utils'

interface AuthProps {
  children: ReactElement | ReactElement[]
}

export const Auth: FC<AuthProps> = ({ children }): ReactElement => {
  useMemo(() => JSON.parse(window.sessionStorage.getItem(KEY) || '{}'),
    [])

  return (
    <>
      {children}
    </>
  )
}