/* import cookies from 'next-cookies';
import { getCookie } from '../helpers/cookie';
import { Component } from 'react';

const getInitialPropsWrapper = function (Child) {
	return class Higher extends Component {
		constructor(props) {
			super(props);
		}

		static getInitialProps({ req }) {
			if (req) {
				console.log('on server, need to copy cookies from req');
			} else {
				console.log('on client, cookies are automatic');
			}
			return {};
		}
	};
};

export default getInitialPropsWrapper;
 */

/* Ne koristi se, ali moze biti korisno */
