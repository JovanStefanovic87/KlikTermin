//REFAKTORISANO
import { fetchJson } from '../../api/fetchJson'
import cookie from 'cookie'

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || '')
  const response = await fetchJson(
    `settings/getSettingsServices`,
    'get',
    cookies.token,
  )
  res.statusCode = response?.status ? response.status : 200
  res.json(response.data)
}
