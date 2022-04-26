const Label = props => (
	<label htmlFor={props.htmlFor} className={props.className} style={{ display: props.display }} />
);

export default Label;
