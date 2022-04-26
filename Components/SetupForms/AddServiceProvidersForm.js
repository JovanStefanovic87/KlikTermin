//REFAKTORISANO
import { useState, useEffect, useRef } from 'react'
import {
	useDeviceDetect,
	inputChangedHandler,
	updateValidity,
	responseHandler,
	infoMessageHandler,
	getResponseData,
	getErrorMessage,
} from '../../helpers/universalFunctions'
import { saveServiceProviders } from '../../api/saveServiceProviders'
import { getAllServiceProviders } from '../../api/getAllServiceProviders'
import initServiceProviderForm from './initServiceProviderForm'

import Input from '../UI/Forms/Input'
import ServiceProvidersList from './ServiceProvidersList'
import WrappedButtonsMob from '../UI/WrappedButtonsMob'
import TextArea from 'antd/lib/input/TextArea'

import classes from '../../Components/SetupForms/SetupForms.module.scss'

const AddServiceProvidersForm = props => {
	const { isMobile } = useDeviceDetect()
	const isComponentLoad = useRef(true)
	const [displayToolBox, setDisplayToolBox] = useState('none')

	const resetForm = () => {
		props.setServiceProviderId(null)
		props.setServProvFormInput(initServiceProviderForm)
		props.setEditMode(false)
	}

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
		inputChangedHandler(e, inputIdentifier, props.servProvFormInput, props.setServProvFormInput)
	}

	const inputValidityHandler = (inputName, message) => {
		updateValidity(props.setServProvFormInput, props.servProvFormInput, inputName, '', false)
		resHandler(message)
	}

	const getAllServiceProvidersHandler = async () => {
		const api = await getAllServiceProviders()
			.then(res => {
				const getServiceProviderData = getResponseData(res)
				props.setServiceProviderData(getServiceProviderData)
				resetForm()
			})
			.catch(err => {
				const errMessage = getErrorMessage(err.response)
				resHandler(errMessage)
			})
		return api
	}

	const addServiceProviderHandler = () => {
		const api = saveServiceProviders(props.serviceProviderInfo)
			.then(() => {
				getAllServiceProvidersHandler()
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
		addServiceProviderHandler()
	}, [props.serviceProviderInfo])

	const onSubmit = e => {
		e.preventDefault()
		const formData = [
			{
				Id: props.serviceProviderId,
				Name: props.servProvFormInput.serviceProviderName.value.trim(),
				City: props.servProvFormInput.city.value.trim(),
				/* Informations: `Telefon: ${props.servProvFormInput.mobOperator.value}${props.servProvFormInput.phone.value.trim()}`, */
				Informations: props.servProvFormInput.informations.value,
			},
		]
		if (!props.servProvFormInput.serviceProviderName.value.trim()) {
			inputValidityHandler('serviceProviderName', 'Morate uneti naziv salona!')
		} else if (!props.servProvFormInput.city.value.trim()) {
			inputValidityHandler('city', 'Morate uneti grad!')
		} else {
			props.setServiceProviderInfo(formData)
			props.setServiceProvidersList([...props.serviceProvidersList, formData.name])
		}
	}

	/* Load data for edit in props.servProvFormInput state */
	useEffect(() => {
		props.serviceProviderData.filter(item => {
			if (item.id === props.serviceProviderId) {
				/* const phoneNumber = item.informations.replace(/\D/g, ''); */
				/* console.log(item.informations.replace(/\D/g, '')); */
				/* const mobOperator = phoneNumber.substring(0, 3);
				const phone = phoneNumber.substring(3, phoneNumber.length); */
				return props.setServProvFormInput({
					...props.servProvFormInput,
					serviceProviderName: {
						value: item.name,
						touched: false,
						valid: true,
					},
					city: {
						value: item.city,
						touched: false,
						valid: true,
					},
					informations: {
						value: item.informations,
					},
				})
			}
		})
	}, [props.serviceProviderId])

	function forward() {
		props.setDisplayAddServiceProvidersForm('none')
		props.setDisplayAddEmployeeForm('block')
	}

	const inputClassName = isMobile ? classes.InputTextMob : classes.InputText
	const textAreaClassName = isMobile ? classes.InformationsInputMob : classes.InformationsInput
	return (
		<div
			className={classes.AddFormContainer}
			style={{ display: props.displayAddServiceProvidersForm }}>
			<div className={props.isSetupGuide ? '' : classes.AddForm}>
				<h3>Unesite podatke salona</h3>
				<Input
					type="text"
					name="serviceProviderName"
					placeholder="Naziv salona"
					className={inputClassName}
					value={props.servProvFormInput.serviceProviderName.value}
					onChange={e => inputChanged(e, 'serviceProviderName')}
					invalid={!props.servProvFormInput.serviceProviderName.valid}
				/>
				<Input
					type="text"
					name="city"
					placeholder="Grad"
					className={inputClassName}
					value={props.servProvFormInput.city.value}
					onChange={e => inputChanged(e, 'city')}
					invalid={!props.servProvFormInput.city.valid}
				/>
				<TextArea
					name="informations"
					placeholder="Unesite informacije (adresa, telefon, e-mail, dodatne informacije...)"
					className={textAreaClassName}
					value={props.servProvFormInput.informations.value}
					/* minRows={4} */
					maxLength="500"
					onChange={e => inputChanged(e, 'informations')}
				/>
				<Input
					type="button"
					value="dodaj"
					display={isMobile ? 'none' : 'block'}
					className={[classes.ChoiceButton, classes.Add].join(' ')}
					onClick={onSubmit}
				/>
				<ServiceProvidersList
					serviceProviderData={props.serviceProviderData}
					displayToolBox={displayToolBox}
					setDisplayToolBox={setDisplayToolBox}
					id={props.serviceProviderId}
					setId={props.setServiceProviderId}
					setEditMode={props.setEditMode}
				/>
				<Input
					type="button"
					value="nastavi >>>"
					display={isMobile ? 'none' : 'inline-block'}
					className={isMobile ? classes.ForwardMob : classes.Forward}
					onClick={() => forward()}
				/>
				<WrappedButtonsMob
					forward={() => forward()}
					save={onSubmit}
					isMobile={isMobile}
					displayForward="inline-block"
					displaySave="block"
					displayAdd="none"
					displayStopEdit={props.editMode ? 'block' : 'none'}
					stopEdit={() => resetForm()}
				/>
			</div>
		</div>
	)
}

export default AddServiceProvidersForm
