import Input from '../../UI/Forms/Input';

import classes from '../../SetupForms/SetupForms.module.scss';

const QuestionFrom = props => (
	<form style={{ display: props.displayQuestionForm }} className={classes.GuideForm}>
		<h3>{props.title}</h3>
		<div className={classes.ChoiceButtonCountainer}>
			<Input
				type="button"
				value="DA"
				className={[classes.ChoiceButton, classes.Confirm].join(' ')}
				onClick={props.onSubmit}
			/>
			<Input
				type="button"
				value="NE"
				className={[classes.ChoiceButton, classes.Deny].join(' ')}
				onClick={props.onDecline}
			/>
		</div>
	</form>
);

export default QuestionFrom;
