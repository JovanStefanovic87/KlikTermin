import axios from 'axios'

export const userVerification = (userData) => {
  return axios.post('http://localhost:3000/api/userVerification', {
    userData,
  })
}
