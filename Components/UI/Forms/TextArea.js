import TextareaAutosize from 'react-textarea-autosize';

import classes from '../UI.module.scss';

const TextArea = props => {
	const inputClasses = [props.className];

	if (props.invalid) {
		inputClasses.push(classes.InvalidInput);
	}
	return (
		<TextareaAutosize
			type="textarea"
			name={props.name}
			value={props.value}
			maxLength={props.maxLength}
			className={props.className}
			placeholder={props.placeholder}
			minRows={props.minRows}
			maxRows={props.maxRows}
			onChange={props.onChange}
			style={{ display: props.display }}
		/>
	);
};

export default TextArea;
