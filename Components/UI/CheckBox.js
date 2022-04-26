const CheckBox = props => (
	<>
		<input
			type="checkbox"
			id={props.name}
			onClick={props.onClick}
			className={props.className}
			checked={props.checked}
			defaultChecked={props.defaultChecked}
		/>
		<label htmlFor={props.name} />
	</>
);

export default CheckBox;
