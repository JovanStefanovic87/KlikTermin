//REFAKTORISANO
import { useState, useRef, useEffect } from 'react'
import {
	useDeviceDetect,
	inputChangedHandler,
	updateValidity,
	responseHandler,
	getErrorMessage,
	emailPattern,
	numericPattern,
} from '../../../helpers/universalFunctions'
import { userRegistration } from '../../../api/userRegistration'
import initState from './initState'
import resetPassword from './resetPassword'

import Select from '../../UI/Select'
import Input from '../../UI/Forms/Input'

import classes from '../../UI/UI.module.scss'

const RegServProv = props => {
	const { isMobile } = useDeviceDetect()
	const isComponentLoad = useRef(true)
	const [companyData, setCompanyData] = useState({})

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

	const inputValidityHandler = (inputName, message) => {
		updateValidity(setFormInput, formInput, inputName, '', false)
		resHandler(message)
	}

	const refreshPassword = {
		...formInput,
		resetPassword,
	}

	function closeForm() {
		props.setDisplayTabContainer('none')
		setFormInput(initState)
	}

	const regHandler = () => {
		const api = userRegistration(companyData)
			.then(() => {
				responseHandler(
					props.setShowResponseModal,
					'Poslali smo Vam verifikacioni e-mail i sms. Klikom na link u e-mail-u i sms-u registracija će biti završena.',
					'green', //becouse border color function is not simplified
					!props.showResponseModal.triger,
					props.setIsLoading,
				)
				props.setDisplayTabContainer('none')
			})
			.catch(err => {
				const errMessage = getErrorMessage(err.response)
				resHandler(errMessage)
			})
		api
		setFormInput(initState)
	}

	useEffect(() => {
		if (isComponentLoad.current) {
			isComponentLoad.current = false
			return
		}
		regHandler()
	}, [companyData])

	const onSubmit = e => {
		e.preventDefault()
		props.setIsLoading(true)
		const formData = {
			name: formInput.name.value.trim(),
			companyName: formInput.companyName.value.trim(),
			email: formInput.email.value.trim(),
			phone: formInput.mobOperator.value + formInput.phone.value.trim(),
			userName: formInput.userName.value.trim(),
			password: formInput.password.value.trim(),
			city: formInput.city.value.trim(),
			address: formInput.address.value.trim(),
		}
		if (!formInput.name.value.trim()) {
			inputValidityHandler('name', 'Morate uneti Ime i prezime!')
		} else if (!formInput.userName.value.trim()) {
			inputValidityHandler('userName', 'Morate uneti korisničko ime!')
		} else if (!formInput.companyName.value.trim()) {
			inputValidityHandler('companyName', 'Morate uneti naziv firme!')
		} else if (!formInput.city.value.trim()) {
			inputValidityHandler('city', 'Morate uneti grad!')
		} else if (!formInput.mobOperator.value) {
			inputValidityHandler('mobOperator', 'Morate izabrati pozivni broj!')
		} else if (
			!formInput.phone.value.trim() ||
			!numericPattern.test(formInput.phone.value) ||
			formInput.phone.value.length < 6
		) {
			inputValidityHandler('phone', 'Morate uneti validan broj telefona!')
		} else if (!formInput.email.value.trim() || !emailPattern.test(formInput.email.value)) {
			inputValidityHandler('email', 'Morate uneti validnu e-mail adresu!')
		} else if (!formInput.password.value.trim()) {
			inputValidityHandler('password', 'Morate uneti lozinku!')
		} else if (!formInput.passConfirm.value.trim()) {
			inputValidityHandler('passConfirm', 'Morate uneti potvrdu izabrane lozinke!')
		} else if (formInput.password.value.trim() !== formInput.passConfirm.value.trim()) {
			setFormInput(refreshPassword)
			inputValidityHandler('passConfirm', 'Lozinka i potvrda moraju biti jednake!')
		} else {
			setCompanyData(formData)
		}
	}

	const inputClassName = isMobile ? classes.InputTextMob : classes.InputText
	return (
		<form
			style={{ display: props.displayRegServProv }}
			className={classes.Form}
			onSubmit={onSubmit}>
			<h2 className={isMobile ? classes.FormTitleMob : classes.FormTitle}>
				REGISTRACIJA PRUŽAOCA USLUGA
			</h2>
			<Input
				type="text"
				name="name"
				className={inputClassName}
				placeholder="Uneti ime i prezime"
				value={formInput.name.value}
				maxLength="50"
				onChange={e => inputChanged(e, 'name')}
				invalid={!formInput.name.valid}
				ref={props.regInputRef}
			/>
			<Input
				type="text"
				name="userName"
				className={inputClassName}
				placeholder="Uneti korisničko ime"
				value={formInput.userName.value}
				maxLength="50"
				onChange={e => inputChanged(e, 'userName')}
				invalid={!formInput.userName.valid}
			/>
			<Input
				type="text"
				name="companyName"
				className={inputClassName}
				placeholder="Uneti naziv firme"
				value={formInput.companyName.value}
				maxLength="50"
				onChange={e => inputChanged(e, 'companyName')}
				invalid={!formInput.companyName.valid}
			/>
			<Input
				type="text"
				name="address"
				className={inputClassName}
				placeholder="Uneti adresu firme"
				value={formInput.address.value}
				maxLength="50"
				onChange={e => inputChanged(e, 'address')}
			/>
			<Input
				type="text"
				name="city"
				className={inputClassName}
				placeholder="Uneti grad"
				value={formInput.city.value}
				maxLength="40"
				onChange={e => inputChanged(e, 'city')}
				invalid={!formInput.city.valid}
			/>
			<Select
				name="mobOperator"
				className={isMobile ? classes.MobileOperatorMob : classes.MobileOperator}
				display="inline-block"
				value={formInput.mobOperator.value}
				onChange={e => inputChanged(e, 'mobOperator')}
				invalid={!formInput.mobOperator.valid}>
				<option value="" disabled selected>
					06x
				</option>
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
				placeholder="Uneti telefon"
				value={formInput.phone.value}
				maxLength="7"
				onChange={e => inputChanged(e, 'phone')}
				invalid={!formInput.phone.valid}
			/>
			<Input
				type="text"
				name="email"
				className={inputClassName}
				placeholder="Uneti e-mail"
				value={formInput.email.value}
				maxLength="50"
				onChange={e => inputChanged(e, 'email')}
				invalid={!formInput.email.valid}
			/>
			<Input
				type="password"
				name="password"
				className={inputClassName}
				placeholder="Izabrati lozinku"
				value={formInput.password.value}
				maxLength="50"
				onChange={e => inputChanged(e, 'password')}
				invalid={!formInput.password.valid}
			/>
			<Input
				type="password"
				name="passConfirm"
				className={inputClassName}
				placeholder="Ponovo uneti lozinku"
				value={formInput.passConfirm.value}
				maxLength="50"
				onChange={e => inputChanged(e, 'passConfirm')}
				invalid={!formInput.passConfirm.valid}
			/>
			<Input
				type="submit"
				value="REGISTRUJ SE"
				display="block"
				width={isMobile ? '48%' : 'inherit'}
				float={isMobile ? 'left' : 'inherit'}
				margin={isMobile ? '20px auto 5px auto' : '40px auto 5px auto'}
				className={isMobile ? classes.SubmitButtonMob : classes.SubmitButton}
			/>
			<Input
				type="button"
				value="ODUSTANI"
				display="block"
				float={isMobile ? 'right' : 'inherit'}
				width={isMobile ? '48%' : 'inherit'}
				margin="20px auto 5px auto"
				color="orangered"
				className={isMobile ? classes.FormButtonCloseMob : classes.FormButton}
				onClick={() => closeForm()}
			/>
		</form>
	)
}

export default RegServProv
