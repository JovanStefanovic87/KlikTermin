import { useState } from 'react';
import classes from '../UI/UI.module.scss';
import Login from './Login/Login';
import PassRecovery from './PassRecovery/PassRecovery';
import RegClient from './RegClient/RegClient';

const AuthTabs = props => {
	const [regColor, setRegColor] = useState('orange');
	const [loginColor, setLoginColor] = useState('white');
	const [displayRegClientForm, setDisplayRegClientForm] = useState('block');
	const [displayLogin, setDisplayLogin] = useState('none');

	const regTabHandler = () => {
		setRegColor('orange'),
			setLoginColor('white'),
			setDisplayRegClientForm('block'),
			setDisplayLogin('none');
	};

	const loginTabHandler = () => {
		setRegColor('white'),
			setLoginColor('orange'),
			setDisplayRegClientForm('none'),
			setDisplayLogin('block');
	};

	return (
		<div className={classes.TabContainer}>
			<div className={classes.TabButtonContainer}>
				<button
					style={{ color: regColor }}
					onClick={() => {
						regTabHandler();
					}}>
					Registracija
				</button>
				<button style={{ color: loginColor }} onClick={() => loginTabHandler()}>
					Login
				</button>
			</div>
			<RegClient
				display={displayRegClientForm}
				setIsLoading={props.setIsLoading}
				setShowResponseModal={props.setShowResponseModal}
				setShowBackdrop={props.setShowBackdrop}
				userId={props.userId}
			/>
			<Login
				displayLogin={displayLogin}
				setDisplayLogin={setDisplayLogin}
				modalAnimation={props.showResponseModal.animation}
				setDisplayPassRecovery={props.setDisplayPassRecovery}
				setShowResponseModal={props.setShowResponseModal}
				setShowBackdrop={props.setShowBackdrop}
				setIsLoading={props.setIsLoading}
				setUserStatus={props.setUserStatus}
				clientAuth={1}
			/>
			<PassRecovery
				displayPassRecovery={props.displayPassRecovery}
				setDisplayPassRecovery={props.setDisplayPassRecovery}
				setDisplayLogin={setDisplayLogin}
				setShowBackdrop={props.setShowBackdrop}
				setShowResponseModal={props.setShowResponseModal}
				clientAuth={props.displayPassRecovery === 'none' ? 0 : 1}
			/>
		</div>
	);
};

export default AuthTabs;
