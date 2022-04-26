import classes from './HomePage.module.scss';

const OurServicesContainer = props => (
	<div className={classes.OurServicesContainer}>{props.children}</div>
);

export default OurServicesContainer;
