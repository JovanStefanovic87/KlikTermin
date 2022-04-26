/* import React from 'react';
import { wrapper } from '../redux/store';

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

export default wrapper.withRedux(MyApp);
 */

import App from 'next/app';
import React from 'react';

import './_app.scss';

export default class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return { pageProps };
	}

	render() {
		const { Component, pageProps } = this.props;

		return (
			<>
				<Component {...pageProps} />
			</>
		);
	}
}

