//REFAKTORISANO
import { fetchJson } from '../../api/fetchJson'
import cookie from 'cookie'

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || '')
  const serviceProviderId = req.body.serviceProviderId
  const response = await fetchJson(
    `users/getAllEmployees?serviceProviderId=${serviceProviderId}`,
    'get',
    cookies.token,
  )
  res.statusCode = response?.status ? response.status : 200
  res.json(response.data)
}
