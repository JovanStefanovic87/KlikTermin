//REFAKTORISANO
import { fetchJson } from '../../api/fetchJson'
import cookie from 'cookie'

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || '')
  const employee = req.body.employee
  const obj = req.body.employeeData
  const response = await fetchJson(
    `appointments/addNewService?employee=${employee}`,
    'post',
    cookies.token,
    obj,
  )
  res.statusCode = response?.status ? response.status : 200
  res.json(response.data)
}
