import classes from './UI.module.scss';

const Radio = props => (
	<>
		<label htmlFor={props.htmlFor} className={classes.radiolbl} style={{ display: props.display }}>
			<input
				type="radio"
				name={props.name}
				id={props.id}
				onClick={props.onClick}
				defaultChecked={props.defaultChecked}
			/>
			<span className={classes.checkmark} />
		</label>
	</>
);

export default Radio;
