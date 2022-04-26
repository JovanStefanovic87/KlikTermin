/* import Router from 'next/router';
import actions from '../redux/actions';
import { getCookie } from '../helpers/cookie'; */

// checks if the page is being loaded on the server, and if so, get auth token from the cookie:
/* export default function (ctx) {
	if (ctx.isServer) {
		if (ctx.req.headers.cookie) {
			ctx.store.dispatch(actions.reauthenticate(getCookie('token', ctx.req)));
		}
	} else {
		const token = ctx.response.data.access_token.getState().authentication.token;
		console.log('hello');

		if (token && (ctx.pathname === '/signin' || ctx.pathname === '/signup')) {
			setTimeout(function () {
				Router.push('/');
			}, 0);
		} 
	}
}
 */

/* bice potrebno za redux */
