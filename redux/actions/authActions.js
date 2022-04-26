import Router from 'next/router';
import { fetchJson } from '../../api/fetchJson';
import { AUTHENTICATE, DEAUTHENTICATE } from '../types';
/* import { API } from '../../config'; */
import { setCookie, removeCookie } from '../../helpers/cookie';

// gets token from the api and stores it in the redux store and in cookie
const authenticate = ({ userName, password }, type) => {
	if (type !== 'signin' && type !== 'signup') {
		throw new Error('Wrong API call!');
	}
	return dispatch => {
		fetchJson
			.post(`localhost:3000/users/${type}`, { userName, password })
			.then(response => {
				setCookie('token', response.data.access_token);
				Router.push('/kalendar');
				dispatch({ type: AUTHENTICATE, payload: response.data.access_token });
			})
			.catch(err => {
				throw new Error(err);
			});
	};
};

// gets the token from the cookie and saves it in the store
const reauthenticate = token => {
	return dispatch => {
		dispatch({ type: AUTHENTICATE, payload: token });
	};
};

// removing the token
const deauthenticate = () => {
	return dispatch => {
		removeCookie('token');
		Router.push('/');
		dispatch({ type: DEAUTHENTICATE });
	};
};

export default {
	authenticate,
	reauthenticate,
	deauthenticate,
};
