import { fetchJson } from '../../api/fetchJson'

export const clientRegistration = (userData, userId) => {
  return fetchJson(
    `users/clientRegistration?userId=${userId}`,
    'post',
    {
      'Content-Type': 'application/json',
    },
    userData,
  )
}
