const cookie = require('cookie')
import { fetchJson } from '../../api/fetchJson'

export default async (req, res) => {
  const userName = req.body.userData.userName
  const password = req.body.userData.password
  const response = await fetchJson(
    `users/login?username=${userName}&password=${password}`,
    'get',
    {},
  )

  const request_config = res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', response.data.access_token, {
      httpOnly: true,
      secure: false, //process.env.NODE_ENV !== 'development',
      maxAge: 600 * 60,
      sameSite: 'strict',
      path: '/',
    }),
  )
  request_config

  !response.status ? (res.statusCode = 200) : (res.statusCode = response.status)
  res.json(response.data)
}
