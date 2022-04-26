//REFAKTORISANO
import { useState, useEffect, useRef } from 'react'
import {
	useDeviceDetect,
	inputChangedHandler,
	responseHandler,
	emailPattern,
} from '../../../helpers/universalFunctions'
import initState from './initState'

import DescriptionLabel from '../../UI/DescriptionLabel'
import Input from '../../UI/Forms/Input'
import Select from '../../UI/Select'

import classes from '../../UI/UI.module.scss'

const PassRecovery = props => {
	const { isMobile } = useDeviceDetect()
	const isPageLoad = useRef(true)
	const [userData, setUserData] = useState([])

	const [formInput, setFormInput] = useState(initState)

	function resHandler(message) {
		responseHandler(
			props.setShowResponseModal,
			message,
			'red',
			!props.showResponseModal.triger,
			props.setIsLoading,
		)
	}

	function inputChanged(e, inputIdentifier) {
		inputChangedHandler(e, inputIdentifier, formInput, setFormInput)
	}

	function closeForm() {
		props.setDisplayPassRecovery('none')
		props.setDisplayLogin('block')
		setFormInput(initState)
	}

	/* `const passRecoveryHandler = () => {
		const api = saveServiceProviders(props.serviceProviderInfo)
			.then(res => {
				console.log(res);
				getAllServiceProvidersHandler();
				infoMessageHandler(props.setShowInfoModal, 'Uspešno sačuvano', !props.triger);
			})
			.catch(err => {
				if (err.response) {
					apiErrorHandler(err.response)
				} else if (err.request) {
					apiErrorHandler(err.request)
				} else {
					apiErrorHandler(err)
				}
			});
		api;
	};


	const passRecoveryHandler = () => {
		const api = axios
			.post('/logins.json', userData)
			.then(response => {
				console.log(response),
					alert('Poslali smo Vam podatke za prijavu. Proverite sms odnosno e-mail');
			})
			.catch(error => console.log(error));
		api;
		setFormInput(initState);
	}; */

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false
			return
		}
		props.passRecoveryHandler()
	}, [userData])

	const onSubmit = e => {
		e.preventDefault()
		const formData = {
			mobOperator: formInput.mobOperator.value,
			phone: formInput.phone.value.trim(),
			email: formInput.email.value.trim(),
		}
		if (
			(formInput.mobOperator.value !== '' && formInput.phone.value.trim() !== '') ||
			(formInput.email.value.trim() !== '' && emailPattern.test(formInput.email.value))
		) {
			setUserData([...userData, formData])
			props.setDisplayPassRecovery('none')
		} else {
			setFormInput(initState)
			resHandler('Morate uneti broj telefona ili validnu e-mail adresu!')
		}
	}
	const inputClassName = isMobile ? classes.InputTextMob : classes.InputText
	const formMarginTop = isMobile ? '60px' : '0'
	return (
		<form
			style={{
				display: props.displayPassRecovery,
				marginTop: formMarginTop,
			}}
			className={classes.Form}
			onSubmit={onSubmit}>
			<DescriptionLabel
				className={classes.DesciptionLabel}
				color="orange"
				text="Unesite svoj broj telefona ili Email adresu kako bismo Vam poslali podatke za prijavu"
			/>
			<Select
				name="mobOperator"
				className={isMobile ? classes.MobileOperatorMob : classes.MobileOperator}
				display="inline-block"
				margin="50px auto 5px auto"
				placeholder="064"
				value={formInput.mobOperator.value}
				onChange={e => inputChanged(e, 'mobOperator')}
				invalid={!formInput.mobOperator.valid}>
				<option value="060">060</option>
				<option value="061">061</option>
				<option value="062">062</option>
				<option value="063">063</option>
				<option value="064">064</option>
				<option value="065">065</option>
				<option value="066">066</option>
				<option value="0677">0677</option>
				<option value="0678">0678</option>
				<option value="069">069</option>
			</Select>
			<Input
				type="number"
				name="phone"
				className={isMobile ? classes.PhoneNumberMob : classes.PhoneNumber}
				display="inline-block"
				margin="50px auto 5px auto"
				placeholder="Uneti telefon"
				maxLength="7"
				value={formInput.phone.value}
				onChange={e => inputChanged(e, 'phone')}
				invalid={!formInput.phone.valid}
			/>
			<Input
				type="text"
				name="email"
				className={inputClassName}
				display="block"
				margin="15px auto 5px auto"
				placeholder="Uneti e-mail"
				value={formInput.email.value}
				onChange={e => inputChangedHandler(e, 'email')}
				invalid={!formInput.email.valid}
			/>
			<Input
				type="submit"
				value="POTVRDI"
				display="block"
				margin="40px auto 5px auto"
				className={isMobile ? classes.SubmitButtonMob : classes.SubmitButton}
			/>
			<Input
				type="button"
				value="NAZAD"
				display={props.displayPassRecovery === 'block' ? 'block' : 'none'} //don't need button in client authentication page
				margin="20px auto 5px auto"
				color="orangered"
				className={isMobile ? classes.FormButtonCloseMob : classes.FormButton}
				onClick={() => closeForm()}
			/>
		</form>
	)
}

export default PassRecovery
