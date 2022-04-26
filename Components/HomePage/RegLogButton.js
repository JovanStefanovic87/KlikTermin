import { useEffect, useState } from 'react';
import { useDeviceDetect } from '../../helpers/universalFunctions';

import Button from '../UI/Button';

import classes from './HomePage.module.scss';

const RegLogButton = props => {
	const { isMobile } = useDeviceDetect();
	const [scrollY, setScrollY] = useState(0);
	const [show, setShow] = useState(true);

	function OffsetY() {
		setScrollY(window.pageYOffset);
	}

	useEffect(() => {
		function watchScroll() {
			window.addEventListener('scroll', OffsetY);
		}
		watchScroll();
		if (scrollY > 50) {
			setShow(false);
		} else {
			setShow(true);
		}
		return () => {
			window.removeEventListener('scroll', OffsetY);
		};
	});

	return (
		<div
			className={classes.RegLogButton}
			style={{
				display: isMobile ? 'block' : 'none',
				transform: show ? 'translate(0, 0)' : 'translate(0, 100px)',
			}}>
			<Button value="PRIJAVA" float="left" margin="0 0 0 4px" onClick={props.onClickLogin} />
			<Button value="REGISTRACIJA" float="right" margin="0 4px 0 0" onClick={props.onClickReg} />
		</div>
	);
};

export default RegLogButton;
