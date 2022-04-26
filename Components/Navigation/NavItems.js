import { useDeviceDetect } from '../../helpers/universalFunctions';

import classes from './Navigation.module.scss';

const NavItems = props => {
	const { isMobile } = useDeviceDetect();
	if (isMobile) {
		return (
			<ul className={classes.NavServiceProviderItemsMob} style={{ display: props.display }}>
				{props.children}
			</ul>
		);
	}
	return <ul className={classes.NavServiceProviderItemsPC}>{props.children}</ul>;
};

export default NavItems;
