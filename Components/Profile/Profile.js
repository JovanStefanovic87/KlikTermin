//REFAKTORISANO
import { useState, useEffect, useRef } from 'react'
import {
	useDeviceDetect,
	inputChangedHandler,
	responseHandler,
	infoMessageHandler,
	updateValidity,
	getErrorMessage,
	emailPattern,
	numericPattern,
} from '../../helpers/universalFunctions'
import { saveEmployeeProfile } from '../../api/saveEmployeeProfile.js'
import WrappedButtonsMob from '../UI/WrappedButtonsMob'
import ListBody from '../UI/List/ListBody/ListBody'
import ListHead from '../UI/List/ListHead/ListHead'

import classes from '../UI/UI.module.scss'

const Profile = props => {
	const { isMobile } = useDeviceDetect()
	const isComponentLoad = useRef(true)
	const [editMode, setEditMode] = useState(false)
	const [userData, setUserData] = useState([])
	const initialData = {
		name: {
			value: props.profileData.name,
			touched: false,
			valid: true,
		},
		userName: {
			value: props.profileData.userName,
			touched: false,
			valid: true,
		},
		email: {
			value: props.profileData.email,
			touched: false,
			valid: true,
		},
		phone: {
			value: props.profileData.phone,
			touched: false,
			valid: true,
		},
		oldPassword: {
			value: '',
			touched: false,
			valid: true,
		},
		newPassword: {
			value: '',
			touched: false,
			valid: true,
		},
	}
	const [formInput, setFormInput] = useState(initialData)

	function resHandler(message) {
		responseHandler(
			props.setShowResponseModal,
			message,
			'red',
			!props.showResponseModal.triger,
			props.setIsLoading,
		)
	}

	function infoHandler(message) {
		infoMessageHandler(
			props.setShowInfoModal,
			message,
			!props.showInfoModal.triger,
			props.setIsLoading,
		)
	}

	const inputChanged = (e, inputIdentifer) => {
		inputChangedHandler(e, inputIdentifer, formInput, setFormInput)
		!editMode ? setEditMode(true) : {}
	}

	const inputValidityHandler = (inputName, message) => {
		updateValidity(setFormInput, formInput, inputName, '', false)
		resHandler(message)
	}

	function resetForm() {
		setFormInput(initialData)
		setEditMode(false)
	}

	const addEmployeeProfileDataHandler = () => {
		const api = saveEmployeeProfile(userData)
			.then(() => {
				infoHandler('Uspešno sačuvano')
				setEditMode(false)
			})
			.catch(err => {
				const errMessage = getErrorMessage(err.response)
				resHandler(errMessage)
			})
		api
	}

	const onSubmit = e => {
		e.preventDefault()
		const formData = {
			Id: props.profileData.id,
			Name: formInput.name.value.trim(),
			Phone: formInput.phone.value.trim(),
			Email: formInput.email.value.trim(),
			OldPassword: formInput.oldPassword.value.trim(),
			NewPassword: formInput.newPassword.value.trim(),
		}
		if (!formInput.name.value.trim()) {
			inputValidityHandler('name', 'Morate uneti ime i prezime!')
		} else if (!formInput.email.value.trim() || !emailPattern.test(formInput.email.value)) {
			inputValidityHandler('email', 'Morate uneti validnu e-mail adresu!')
		} else if (
			!formInput.phone.value.trim() ||
			!numericPattern.test(formInput.phone.value) ||
			formInput.phone.value.length < 9
		) {
			inputValidityHandler('phone', 'Morate uneti validan broj telefona!')
		} else {
			setUserData(formData)
			props.setIsLoading(true)
		}
	}

	useEffect(() => {
		if (isComponentLoad.current) {
			isComponentLoad.current = false
			return
		}
		addEmployeeProfileDataHandler()
	}, [userData])

	if (isMobile) {
		return (
			<>
				<ListHead
					title="Podešavanje profila"
					displayCopy="none"
					displayPaste="none"
					displaySearch="none"
					dipslaySerachBar="none"
					displayAdd="none"
					addNew={null}
					displayLink="none"
					displaySelectWeek="none"
				/>
				<ListBody>
					<div className={classes.SettingProp}>
						<div>
							<div>Ime i prezime</div>
							<input
								type="text"
								value={formInput.name.value}
								className={classes.InputMob}
								onChange={e => inputChanged(e, 'name')}
							/>
						</div>
						<div>
							<div>Korisničko ime</div>
							<input
								type="text"
								value={formInput.userName.value}
								className={classes.InputMob}
								onChange={e => inputChanged(e, 'userName')}
							/>
						</div>
						<div>
							<div>E-mail adresa</div>
							<input
								type="text"
								value={formInput.email.value}
								className={classes.InputMob}
								onChange={e => inputChanged(e, 'email')}
							/>
						</div>
						<div>
							<div>Broj telefona</div>
							<input
								type="number"
								value={formInput.phone.value}
								className={classes.InputMob}
								onChange={e => inputChanged(e, 'phone')}
							/>
						</div>
						<div>
							<div>Trenutna lozinka</div>
							<input
								type="password"
								value={formInput.oldPassword.value}
								className={classes.InputMob}
								onChange={e => inputChanged(e, 'oldPassword')}
							/>
						</div>
						<div>
							<div>Nova lozinka</div>
							<input
								type="password"
								value={formInput.newPassword.value}
								className={classes.InputMob}
								onChange={e => inputChanged(e, 'newPassword')}
							/>
						</div>
					</div>
				</ListBody>
				<WrappedButtonsMob
					save={onSubmit}
					isMobile={isMobile}
					displayForward={'none'}
					displaySave="block"
					displayAdd="none"
					displayStopEdit={editMode ? 'block' : 'none'}
					stopEdit={() => resetForm()}
					validation={true}
				/>
			</>
		)
	} else {
		return (
			<>
				<ListHead
					title="Podešavanje profila"
					displayCopy="none"
					displayPaste="none"
					displaySearch="none"
					displayUndo={editMode ? 'block' : 'none'}
					stopEdit={() => resetForm()}
					isProfile={1}
					dipslaySerachBar="none"
					displayAdd="none"
					displayLink="none"
					displaySelectWeek="none"
					addNew={null}
					onSave={onSubmit}
				/>
				<ListBody>
					<div className={classes.SettingName}>
						<div>Ime i Prezime</div>
						<div>Korisničko ime</div>
						<div>E-mail</div>
						<div>Telefon</div>
						<div>Trenutna lozinka</div>
						<div>Nova lozinka</div>
						{/* 						<div>Deaktivacija naloga</div> */}
					</div>
					<div className={classes.SettingProp}>
						<div>
							<input
								type="text"
								value={formInput.name.value}
								onChange={e => inputChanged(e, 'name')}
							/>
						</div>
						<div>
							<input
								type="text"
								value={formInput.userName.value}
								onChange={e => inputChanged(e, 'userName')}
							/>
						</div>
						<div>
							<input
								type="text"
								value={formInput.email.value}
								onChange={e => inputChanged(e, 'email')}
							/>
						</div>
						<div>
							<input
								type="number"
								value={formInput.phone.value}
								onChange={e => inputChanged(e, 'phone')}
							/>
						</div>
						<div>
							<input
								type="password"
								value={formInput.oldPassword.value}
								onChange={e => inputChanged(e, 'oldPassword')}
							/>
						</div>
						<div>
							<input
								type="password"
								value={formInput.newPassword.value}
								onChange={e => inputChanged(e, 'newPassword')}
							/>
						</div>
					</div>
				</ListBody>
			</>
		)
	}
}

export default Profile
