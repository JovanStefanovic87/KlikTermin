import classes from './SetupForms.module.scss';

const AbsenceRadio = props => {
	return (
		<>
			<label
				htmlFor={props.htmlFor}
				className={classes.AbsenceRadiolbl}
				style={{ display: props.display }}>
				<input
					type="radio"
					name={props.name}
					id={props.id}
					onClick={props.onClick}
					value={props.value}
					checked={props.checked}
					defaultChecked={props.defaultChecked}
				/>
				<span className={classes.AbsenceCheckmark} />
			</label>
		</>
	);
};

export default AbsenceRadio;
