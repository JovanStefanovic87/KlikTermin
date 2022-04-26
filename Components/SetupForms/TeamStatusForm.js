import { useState, useEffect, useRef } from 'react';
import { saveServiceProviders } from '../../api/saveServiceProviders';
import { addNewEmployee } from '../../api/addNewEmployee';

import Input from '../UI/Forms/Input';

import classes from '../SetupForms/SetupForms.module.scss';

const TeamStatusForm = props => {
	const isComponentLoad = useRef(true);
	const [question, setQuestion] = useState({
		message: 'Da li imate više salona?',
		displaySaloon: 'block',
		displayEmployee: 'none',
	});
	const [singleCompany, setSingleCompany] = useState(false);
	const [singleEmployee, setSingleEmployee] = useState(false);

	const addNewServiceProviderHandler = () => {
		const api = saveServiceProviders([])
			.then(response => {
				console.log(response);
				props.setIsLoading(false);
				props.nextStep(),
					setQuestion({
						...question,
						message: 'Da li ste jedini zaposleni?',
						displaySaloon: 'none',
						displayEmployee: 'block',
					});
			})
			.catch(err => {
				props.setIsLoading(false);
				if (err.response) {
					console.log(err.response);
					window.location = '/';
				} else if (err.request) {
					console.log(err.request);
				} else {
					console.log('nesto drugo');
				}
			});
		api;
	};

	const addNewEmployeeHandler = () => {
		const api = addNewEmployee(props.token)
			.then(response => {
				console.log(response);
				props.setIsLoading(false);
				props.nextStep();
				props.setDisplayteamStatusForm('none');
			})
			.catch(error => {
				props.setIsLoading(false);
				if (error.response) {
					console.log(error.response);
					/* window.location = '/'; */
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log('nesto drugo');
				}
			});
		api;
	};

	useEffect(() => {
		if (isComponentLoad.current) {
			isComponentLoad.current = false;
			return;
		}
		addNewServiceProviderHandler();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [singleCompany]);

	useEffect(() => {
		if (props.isPageLoad.current) {
			props.isPageLoad.current = false;
			return;
		}
		addNewEmployeeHandler();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [singleEmployee]);

	const singularityHandler = (e, object) => {
		e.preventDefault();
		object(true);
		props.setIsLoading(true);
	};

	function positiveAnswerHandler() {
		props.setDisplayteamStatusForm('none');
		props.setDisplayAddSaloonForm('block');
		props.nextStep();
	}

	function negativeAnswerHandler() {
		props.setDisplayteamStatusForm('none');
		props.setDisplayAddEmployeeForm('block');
		props.nextStep();
	}

	return (
		<form style={{ display: props.displayteamStatusForm }} className={classes.GuideForm}>
			<h3>{question.message}</h3>
			<div className={classes.ChoiceButtonCountainer} style={{ display: question.displaySaloon }}>
				<Input
					type="button"
					value="DA"
					className={[classes.ChoiceButton, classes.Confirm].join(' ')}
					onClick={() => positiveAnswerHandler()}
				/>
				<Input
					type="button"
					value="NE"
					className={[classes.ChoiceButton, classes.Deny].join(' ')}
					onClick={e => singularityHandler(e, setSingleCompany)}
				/>
			</div>
			<div className={classes.ChoiceButtonCountainer} style={{ display: question.displayEmployee }}>
				<Input
					type="button"
					value="DA" //Unos radnika u bazu na osnovu registracionih podataka
					className={[classes.ChoiceButton, classes.Confirm].join(' ')}
					onClick={e => singularityHandler(e, setSingleEmployee)}
				/>
				<Input
					type="button"
					value="NE"
					className={[classes.ChoiceButton, classes.Deny].join(' ')}
					onClick={() => negativeAnswerHandler()}
				/>
			</div>
		</form>
	);
};

export default TeamStatusForm;
