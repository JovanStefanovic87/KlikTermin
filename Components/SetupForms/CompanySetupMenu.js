import { useDeviceDetect } from '../../helpers/universalFunctions';

import Input from '../UI/Forms/Input';

import classes from '../SetupForms/SetupForms.module.scss';

const CompanySetupMenu = props => {
	const { isMobile } = useDeviceDetect();

	return (
		<div style={{ dipslay: props.displayMenu }} className={classes.CompanySetupMenu}>
			{/* <Input
				type="button"
				value="Saloni"
				className={classes.SetupOptionsButton}
				onClick={() => setDisplayAddServiceProvidersForm()}
			/>
			<Input
				type="button"
				value="Radnici"
				className={classes.SetupOptionsButton}
				onClick={() => forward()}
			/> */}
			<Input
				type="button"
				value="Klijenti"
				className={classes.SetupOptionsButton}
				onClick={() => props.forward()}
			/>
			<Input
				type="button"
				value="Usluge"
				className={classes.SetupOptionsButton}
				onClick={() => props.forward()}
			/>
			<Input
				type="button"
				value="Radno vreme"
				className={classes.SetupOptionsButton}
				onClick={() => props.forward()}
			/>
			<Input
				type="button"
				value="Nazad"
				color="red"
				className={classes.SetupOptionsButton}
				onClick={() => props.setDisplayMenu('none')}
			/>
		</div>
	);
};

export default CompanySetupMenu;
