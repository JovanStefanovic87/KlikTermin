//REFAKTORISANO
import { fetchJson } from '../../api/fetchJson'
import cookie from 'cookie'

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || '')
  const obj = req.body.userData
  const response = await fetchJson(
    `users/userVerification?userId=${obj.userId}&verificationType=${obj.verificationType}`,
    'post',
    cookies.token,
    obj,
  )
  res.statusCode = response?.status ? response.status : 200
  res.json(response.data)
}

/* import { fetchJson } from '../../api/fetchJson';

export default async (req, res) => {
    const obj = req.body.userData;
    const url = `users/userVerification?userId=${obj.userId}&verificationType=${obj.verificationType}`;

    async function userVerification() {
        const api = await fetchJson(url, 'post', {}, obj)
            .then(res => {
                return res.data;
            })
            .catch(err => {
                return err.response;
            });

        return api;
    }

    const response = await userVerification();

    response.length === 0 ? (res.statusCode = 200) : (res.statusCode = response.status);

    res.json(response.data);
}; */

/* import { fetchJson } from '../../api/fetchJson';

export const userVerification = userData => {
	return fetchJson(
		`users/userVerification?userId=${userData.userId}&verificationType=${userData.verificationType}`,
		'post',
		{
			'Content-Type': 'application/json',
		},
		userData
	);
};
 */
