import classes from './UI.module.scss';

const Select = props => {
	const inputClasses = [props.className];

	if (props.invalid) {
		inputClasses.push(classes.InvalidInput);
	}

	return (
		<select
			name={props.nameSelect}
			id={props.idSelect}
			value={props.value}
			placeholder={props.placeholder}
			className={inputClasses.join(' ')}
			style={{
				display: props.displaySelect,
				marginTop: props.marginTop,
			}}
			onChange={props.onChange}>
			{props.children}
		</select>
	);
};

export default Select;
