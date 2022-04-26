const Form = props => {
	return (
		<form
			className={props.className}
			style={{
				display: props.display,
			}}
			onSubmit={props.onSubmit}>
			{props.children}
		</form>
	);
};

export default Form;
