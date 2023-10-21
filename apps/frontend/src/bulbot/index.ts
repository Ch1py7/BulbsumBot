interface Response {
  access_token: string
  refresh_token: string
}

const getOAuthToken = async (code: string) => {
  const res = await fetch(`http://localhost:3000/api/v1/bulbot/getOAuthToken?code=${code}`)
  const response: Response = await res.json()
  return response
}

interface AccountInfo {
  client_id: string
  login: string
  user_id: number
}

const getAccountInfo = async (token: string) => {
  const res = await fetch(`http://localhost:3000/api/v1/bulbot/getAccountInfo?token=${token}`)
  const response: AccountInfo = await res.json()
  await addChannel(response.login)
  return response
}

const addChannel = async (channel: string) => {
  await fetch(`http://localhost:3000/api/v1/bulbot/addChannel?channel=${channel}`)
  return 'the channel has been added'
}

export const Bulbot = {
  getOAuthToken,
  getAccountInfo,
  addChannel
}