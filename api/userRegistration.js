import axios from 'axios'

export const userRegistration = (companyData) => {
  return axios.post('http://localhost:3000/api/userRegistration', {
    companyData,
  })
}
