//REFAKTORISANO
import { fetchJson } from '../../api/fetchJson'
import cookie from 'cookie'

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || '')
  const obj = req.body.clientData
  const response = await fetchJson(
    `users/addOrUpdateNewClient`,
    'post',
    cookies.token,
    obj,
  )
  res.statusCode = response?.status ? response.status : 200
  res.json(response.data)
}
