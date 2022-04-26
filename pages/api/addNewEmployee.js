//REFAKTORISANO
import { fetchJson } from '../../api/fetchJson'
import cookie from 'cookie'

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || '')
  const serviceProviderId = req.body.serviceProviderId
  const obj = req.body.employeeData
  const response = await fetchJson(
    `users/addNewEmployee?serviceProviderId=${serviceProviderId}`,
    'post',
    cookies.token,
    obj,
  )
  res.statusCode = response?.status ? response.status : 200
  res.json(response.data)
}
