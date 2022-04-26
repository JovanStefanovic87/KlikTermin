//Refaktorisano
import { useEffect, useRef } from 'react'
import {
	useDeviceDetect,
	inputChangedHandler,
	updateValidity,
	responseHandler,
	infoMessageHandler,
	getErrorMessage,
	emailPattern,
	numericPattern,
} from '../../helpers/universalFunctions'
import { addOrUpdateNewClient } from '../../api/addOrUpdateNewClient'
import Input from '../UI/Forms/Input'
import Select from '../UI/Select'
import WrappedButtonsMob from '../UI/WrappedButtonsMob'

import classes from '../../Components/SetupForms/SetupForms.module.scss'

const AddClientForm = props => {
	const { isMobile } = useDeviceDetect()
	const isComponentLoad = useRef(true)

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

	function inputChanged(e, inputIdentifier) {
		inputChangedHandler(e, inputIdentifier, props.formInput, props.setFormInput)
	}

	const inputValidityHandler = (inputName, message) => {
		updateValidity(props.setFormInput, props.formInput, inputName, '', false)
		resHandler(message)
	}

	function closeForm() {
		props.setDisplayAddClientForm('none')
		props.setDisplayDescription('none')
		props.resetForm()
	}

	function stopEdit() {
		props.setDisplayAddClientForm('none')
		props.setEditMode(false)
		isMobile ? {} : props.resetForm()
	}

	const addClientHandler = () => {
		const api = addOrUpdateNewClient(props.userData)
			.then(() => {
				props.getClientsHandler(false)
				closeForm()
				infoHandler('Uspešno sačuvano')
			})
			.catch(err => {
				const errMessage = getErrorMessage(err.response)
				resHandler(errMessage)
			})
		api
	}

	useEffect(() => {
		if (isComponentLoad.current) {
			isComponentLoad.current = false
			return
		}
		addClientHandler()
	}, [props.userData])

	const onSubmit = e => {
		e.preventDefault()
		const formData = {
			Id: props.clientId,
			Name: props.formInput.name.value.trim(),
			Phone: props.formInput.mobOperator.value + props.formInput.phone.value.trim(),
			Email: props.formInput.email.value.trim(),
			Description: props.formInput.description.value.trim(),
		}
		if (!props.formInput.name.value.trim()) {
			inputValidityHandler('name', 'Morate uneti ime klijenta!')
		} else if (
			!props.formInput.email.value.trim() ||
			!emailPattern.test(props.formInput.email.value)
		) {
			inputValidityHandler('email', 'Morate uneti validnu e-mail adresu!')
		} else if (!props.formInput.mobOperator.value) {
			inputValidityHandler('mobOperator', 'Morate izabrati pozivni broj!')
		} else if (
			!props.formInput.phone.value.trim() ||
			!numericPattern.test(props.formInput.phone.value) ||
			props.formInput.phone.value.length < 6
		) {
			inputValidityHandler('phone', 'Morate uneti validan broj telefona!')
		} else {
			props.setUserData(formData)
			props.setIsLoading(true)
		}
	}

	useEffect(() => {
		props.clientsData.filter(item => {
			if (item.id === props.clientId) {
				const mobOperator = item.phone.substring(0, 3)
				const phone = item.phone.substring(3, item.phone.length)
				return props.setFormInput({
					...props.formInput,
					name: {
						value: item.name,
						touched: false,
						valid: true,
					},
					email: {
						value: item.email,
						touched: false,
						valid: true,
					},
					mobOperator: {
						value: mobOperator,
						touched: false,
						valid: true,
					},
					phone: {
						value: phone,
						touched: false,
						valid: true,
					},
					description: {
						value: item.description,
						touched: false,
						valid: true,
					},
					id: {
						value: item.id,
						touched: false,
						valid: true,
					},
				})
			}
		})
	}, [props.clientId])

	const inputClassName = isMobile ? classes.InputTextMob : classes.InputText
	const readOnlyClassName = isMobile ? classes.ReadOnlyMob : classes.ReadOnly
	return (
		<>
			<div className={classes.AddFormContainer} style={{ display: props.displayAddClientForm }}>
				<div className={classes.AddForm}>
					<h3>Unesite klijente</h3>
					{/* <Select
				name="serviceProviderId"
				className={classes.SelectInputText}
				value={formInput.serviceProviderId.value}
				invalid={!formInput.serviceProviderId.valid}
				onChange={e => inputChangedHandler(e, 'serviceProviderId', formInput, setFormInput)}>
				<option value="" disabled selected hidden>
					Izaberite salon
				</option>
				{serviceProvidersPreview(props.serviceProviderData)}
			</Select> */}
					<Input
						type="text"
						name="name"
						placeholder="Unesite ime i prezime"
						className={inputClassName}
						value={props.formInput.name.value}
						onChange={e => inputChanged(e, 'name')}
						invalid={!props.formInput.name.valid}
					/>
					<Input
						type="text"
						name="email"
						placeholder="Unesite e-mail adresu"
						className={inputClassName}
						value={props.formInput.email.value}
						onChange={e => inputChanged(e, 'email')}
						invalid={!props.formInput.email.valid}
					/>
					<Select
						name="mobOperator"
						className={isMobile ? classes.MobileOperatorMob : classes.MobileOperator}
						display="inline-block"
						value={props.formInput.mobOperator.value}
						onChange={e => {
							inputChanged(e, 'mobOperator')
						}}
						invalid={!props.formInput.mobOperator.valid}>
						<option value="" disabled defaultValue>
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
						placeholder="Unesite broj telefona"
						maxLength="7"
						value={props.formInput.phone.value}
						onChange={e => inputChanged(e, 'phone')}
						invalid={!props.formInput.phone.valid}
					/>
					<Input
						type="text"
						name="description"
						placeholder="Dodatne informacije"
						className={inputClassName}
						value={props.formInput.description.value}
						onChange={e => inputChanged(e, 'description')}
					/>
					<Input
						type="button"
						value={props.editMode ? 'Sačuvaj' : 'Dodaj'}
						display={isMobile ? 'none' : 'block'}
						className={[classes.ChoiceButton, classes.Add].join(' ')}
						onClick={onSubmit}
					/>
					<Input
						type="button"
						value="Odustani"
						display={isMobile ? 'none' : 'inline-block'}
						color="red"
						className={isMobile ? classes.ForwardMob : classes.Forward}
						onClick={() => stopEdit()}
					/>
				</div>
			</div>
			<WrappedButtonsMob
				display={props.displayAddClientForm}
				save={onSubmit}
				isMobile={props.displayWrappedButtonsMob(props.displayAddClientForm)}
				displayForward="none"
				displaySave="block"
				displayAdd="none"
				displayStopEdit="block"
				validation={true}
				stopEdit={stopEdit}
			/>
		</>
	)
}

export default AddClientForm
