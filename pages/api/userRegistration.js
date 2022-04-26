import { fetchJson } from '../../api/fetchJson'

export default async (req, res) => {
  const companyData = req.body.companyData
  const response = await fetchJson(
    `users/companyRegistration`,
    'post',
    {},
    companyData,
  )

  !response.statusCode
    ? res.statusCode === 200
    : res.statusCode === response.status

  res.json(response.data)
}
