import { Auth, Home, OAuth, TTS } from 'pages'
import { FC, ReactElement } from 'react'
import { Route, Switch } from 'wouter'

export const App: FC = (): ReactElement => {
  return (
    <Switch>
      <Route path='/' component={Home} />
      <Route path='/oauth' component={OAuth} />
      <Route path='/tts'>
        <Auth>
          <TTS />
        </Auth>
      </Route>
    </Switch>
  )
}
