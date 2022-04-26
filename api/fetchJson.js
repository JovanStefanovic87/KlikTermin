import axios from 'axios'
const API_URL_BE = process.env.API_URL_BE

export const fetchJson = (url, method, token, body) => {
  const Axios = axios.create({
    baseURL: API_URL_BE,
    headers: token ? { Authorization: 'Bearer ' + token } : {},
  })

  return Axios({
    method,
    url,
    data: body,
  })
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err.response
    })
}
