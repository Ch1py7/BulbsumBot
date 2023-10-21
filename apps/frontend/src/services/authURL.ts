const twitchUrl = 'https://id.twitch.tv/oauth2'
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

export const authURL = () => {
  const url = new URL(`${twitchUrl}/authorize`)
  url.searchParams.set('client_id', CLIENT_ID)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('scope', 'chat:read')
  url.searchParams.set('redirect_uri', location.origin + '/oauth')
  return url.href
}