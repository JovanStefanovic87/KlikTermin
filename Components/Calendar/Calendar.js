import { useState, useRef, useEffect } from 'react'
import moment from 'moment'
import {
	useDeviceDetect,
	getTimeString,
	getErrorMessage,
	getMondayForAPI,
	responseHandler,
	infoMessageHandler,
	confirmHandler,
	getResponseData,
} from '../../helpers/universalFunctions'
import Days from './RightTable/CalHead/Days'
import Time from './LeftTable/Time'
import CalBodyRow from './RightTable/CalBody/CalBodyRow'
import Backdrop from '../UI/Backdrop'
import CalNav from './Nav/CalNav'
import RegCodeClientForm from './Forms/RegCodeClientForm'
import ClientPickerForm from './Forms/ClientPickerForm'
import ServicePickerForm from './Forms/ServicePickerForm'
import classes from './Calendar.module.scss'
import classesUI from '../UI/UI.module.scss'
import { getDateFromDayOfWeek } from '../../helpers/universalFunctions'
import { saveAppointment } from '../../api/saveAppointment'
import { v4 as uuidv4 } from 'uuid'
import InfoModal from '../UI/Modal/InfoModal'
import ConfirmModal from '../UI/Modal/ConfirmModal'
import ResponseModal from '../UI/Modal/ResponseModal'
import { useRouter } from 'next/router'
import AppointmentNote from './RightTable/CalBody/AppointmentNote'
import Loader from '../UI/Loader'
import { getAppointments } from '../../api/getAppointments'
import { deleteAppointment } from '../../api/deleteAppointment'
import CheckBox from '../UI/CheckBox'

const Calendar = props => {
	const router = useRouter()
	const { isMobile } = useDeviceDetect()
	const [appointmentId, setAppointmentId] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [checkedServices, setCheckedServices] = useState([])
	const [daysInWeek, setDaysInWeek] = useState([])
	const [minMaxWorkingHours, setMinMaxWorkingWours] = useState([])
	const [workHourAppointments, setWorkHourAppointments] = useState([])
	const days = ['Pon', 'Uto', 'Sre', 'Cet', 'Pet', 'Sub', 'Ned']
	const [chosenClient, setChosenClient] = useState('')
	const [appointmentData, setAppointmentData] = useState(props.appointments)
	const [currMonday, setCurrMonday] = useState()

	const [displayClientPicker, setDisplayClientPicker] = useState('none')
	const [displayServicesPicker, setDisplayServicesPicker] = useState('none')
	const [displayRegCodeClient, setDisplayRegCodeClient] = useState('none')
	const [displayAppointmentsNote, setDisplayAppointmentsNote] = useState('none')

	const cloneDiv = useRef(0)
	const cloneScrollTop = useRef(0)
	const cloneHeadScrollLeft = useRef(0)
	const [showInfoModal, setShowInfoModal] = useState({
		triger: false,
		message: null,
	})
	const [showConfirmModal, setShowConfirmModal] = useState({
		message: null,
		triger: false,
	})
	const [showResponseModal, setShowResponseModal] = useState({
		triger: false,
		message: null,
		border: '',
	})
	const [clickedCell, setClickedCell] = useState([
		{
			date: null,
			time: null,
		},
	])

	function resHandler(message, border) {
		responseHandler(setShowResponseModal, message, border, !showResponseModal.triger, setIsLoading)
	}

	function infoHandler(message) {
		infoMessageHandler(setShowInfoModal, message, !showInfoModal.triger, setIsLoading)
	}

	function confirmMessageHandler(message) {
		confirmHandler(setShowConfirmModal, message, !showConfirmModal.triger, setIsLoading)
	}

	const getAppointmentsAfterDelete = async () => {
		const api = await getAppointments(props.employeeId, props.dateOfMonday)
			.then(res => {
				const getAppointmentsData = getResponseData(res)
				setAppointmentData(getAppointmentsData)
			})
			.catch(err => {
				const errMessage = getErrorMessage(err.response)
				resHandler(errMessage, 'red')
			})
		api
	}

	const deleteAppointmentHandler = async () => {
		const api = await deleteAppointment(appointmentId)
			.then(() => {
				getAppointmentsAfterDelete()
				infoHandler('Zakazani termin je uspešno otkazan!')
			})
			.catch(err => {
				const errMessage = getErrorMessage(err.response)
				resHandler(errMessage, 'red')
			})
		api
	}

	useEffect(() => {
		setAppointmentData(props.appointments)
	}, [props.appointments])

	useEffect(() => {
		const urlMondayDate = router.query.mondayDate
		setCurrMonday(
			moment(urlMondayDate)
				.locale('sr')
				.startOf('isoweek')
				.format(isMobile ? 'D.MM' : 'D.MMM')
				.toUpperCase(),
		)
		prepDaysInWeek()
	}, [router.asPath])

	useEffect(() => {
		daysInWeek.length > 0 && prepMinMaxWorkingHours()
	}, [daysInWeek])

	useEffect(() => {
		minMaxWorkingHours.length > 0 && prepWorkingHoursForEveryDay()
	}, [minMaxWorkingHours, appointmentData])

	const prepDaysInWeek = () => {
		const urlMondayDate = new Date(router.query.mondayDate)
		const prepDaysInWeek = days.map((d, i) => {
			return {
				day: d,
				date: getDateFromDayOfWeek(urlMondayDate, i),
			}
		})
		setDaysInWeek(prepDaysInWeek)
	}

	const prepMinMaxWorkingHours = () => {
		let minHour = 1440 //24h
		let maxHour = 0
		let cellDuration = 0
		props.workingHours.map(h => {
			const arr = [h.firstStartHour, h.firstEndHour, h.secondStartHour, h.secondEndHour].filter(
				h => h,
			)
			const hour = Math.min(...arr)
			cellDuration = h.cellsDuration
			if (hour < minHour) minHour = hour
		})
		props.workingHours.map(h => {
			const arr = [h.firstStartHour, h.firstEndHour, h.secondStartHour, h.secondEndHour].filter(
				h => h,
			)
			const hour = Math.max(...arr)
			if (hour > maxHour) maxHour = hour
		})

		const prepMinMaxWorkingHours = []
		for (let h = minHour; h <= maxHour; h += cellDuration) {
			prepMinMaxWorkingHours.push(h)
		}
		setMinMaxWorkingWours(prepMinMaxWorkingHours)
	}

	const prepWorkingHoursForEveryDay = () => {
		if (!props.workingHours != undefined) {
			let prepWorkingHoursArr = []
			let workingHoursObj

			if (props.workingHours.length > 0)
				daysInWeek.map(d => {
					let dateInWeek = new Date(d.date).getTime()
					let breakMap = false
					props.workingHours.map(w => {
						let dateOfWorkingHours = new Date(w.date).getTime()
						if (!breakMap) {
							if (dateInWeek == dateOfWorkingHours) {
								workingHoursObj = w
								breakMap = true
							} else {
								workingHoursObj = {
									id: null,
									date: d.date,
									firstStartHour: null,
									firstEndHour: null,
									secondStartHour: null,
									secondEndHour: null,
									cellsDuration: null,
									idAbsenceType: null,
								}
							}
						}
					})
					prepWorkingHoursArr.push(workingHoursObj)
				})

			prepWorkHourAppointment(minMaxWorkingHours, prepWorkingHoursArr)
		}
	}

	const minMaxHourExist = (
		minMaxHour,
		firstStartHour,
		firstEndHour,
		secondStartHour,
		secondEndHour,
	) => {
		return (
			(minMaxHour >= firstStartHour && minMaxHour <= firstEndHour) ||
			(minMaxHour >= secondStartHour && minMaxHour <= secondEndHour)
		)
	}

	const prepWorkHourAppointment = (minMaxWorkingHours, workingHours) => {
		const prepWHA = []
		workingHours.map((h, i) => {
			prepWHA.push({
				date: h.date,
				wha: [],
			})
			minMaxWorkingHours.map(minMaxHour => {
				minMaxHourExist(
					minMaxHour,
					h.firstStartHour,
					h.firstEndHour,
					h.secondStartHour,
					h.secondEndHour,
				)
					? prepWHA[i].wha.push({
							hours: minMaxHour,
							enabled: true,
							absence: h.idAbsenceType,
							appointment: getAppointmentsHandler(h.date, minMaxHour),
					  })
					: prepWHA[i].wha.push({
							hours: minMaxHour,
							enabled: false,
							absence: null,
							appointment: {},
					  })
			})
		})
		setWorkHourAppointments(prepWHA)
	}

	const getAppointmentsHandler = (date, minMaxHour) => {
		const appointment = appointmentData
			?.map(a => {
				let whDate = Date.parse(date.split('T')[0])
				let apDate = Date.parse(a.dateStart.split('T')[0])

				let aDateTime = new Date(a.dateStart)
				let aHour = aDateTime.getHours()
				let aMin = aDateTime.getMinutes()
				let aTime = aHour * 60 + aMin // convert time to minutes

				return whDate == apDate && minMaxHour == aTime
					? {
							id: a.id,
							dateStart: a.dateStart,
							dateEnd: a.dateEnd,
							description: a.description,
							idEmployee: a.idEmployee,
							employeeName: a.employeeName,
							idClient: a.idClient,
							clientName: a.clientName,
							clientPhone: a.clientPhone,
							services: a.services,
					  }
					: null
			})
			.filter(a => a)

		return appointment?.length > 0 ? appointment[0] : {}
	}

	const VerticalTaxing = () => {
		const scroll = cloneDiv.current.scrollTop
		cloneScrollTop.current.scrollTop = scroll
	}

	const HorisontalTaxing = () => {
		const scroll = cloneDiv.current.scrollLeft
		cloneHeadScrollLeft.current.scrollLeft = scroll
	}

	const currYear = moment(currMonday).format('YYYY')
	const currSunday = moment(currMonday)
		.locale('sr')
		.add(6, 'days')
		.format(isMobile ? 'D.MM' : 'D.MMM')
		.toUpperCase()
	const calendarHeaderDates = i =>
		`${days[i]} - ${moment(currMonday).add(i, 'days').locale('sr').format('DD. MMM').toUpperCase()}`

	const calendarWeekSet = prevOrNext => {
		const days = prevOrNext == 'next' ? 7 : -7
		const urlMondayDate = Date.parse(router.query.mondayDate)
		const mondayDate = moment(urlMondayDate).startOf('isoweek').add(days, 'days').toDate()
		const mondayAPIFormat = getMondayForAPI(mondayDate)
		router.push(`/kalendar?mondayDate=${mondayAPIFormat}&employeeId=${props.employeeId}`)
	}

	const nextWeek = () => {
		calendarWeekSet('next')
	}
	const prevWeek = () => {
		calendarWeekSet('prev')
	}

	const minMaxHoursDisplay = () => minMaxWorkingHours.map(h => getTimeString(h))

	const RegCodeClientHandler = () => {
		alert('Uspesna registracija'), setDisplayRegCodeClient('none')
	}

	const BackdropSideDrawer = () => {
		if (isMobile) {
			return <Backdrop display={() => props.displaySideDrawerBackdrop} />
		}
		null
	}

	const pickServices = obj => {
		setCheckedServices(services => {
			const serviceCopy = [...services]
			const index = serviceCopy.findIndex(service => service.id == obj.id)
			if (index > -1) {
				serviceCopy.splice(index, 1)
			} else {
				serviceCopy.push({
					id: obj.id,
					price: obj.price,
					duration: obj.duration,
				})
			}
			return serviceCopy
		})
	}

	const isServiceChecked = obj => {
		const checkedServicesIDs = checkedServices.map(s => s.id)
		return checkedServicesIDs.indexOf(obj.id) !== -1 ? true : false
	}

	const saveNewAppointment = () => {
		const durationSum = checkedServices.map(s => s.duration).reduce((sum, a) => sum + a, 0)
		const dateStart = clickedCell.date.replace('00:00:00', getTimeString(clickedCell.time, true))

		const dateEnd = clickedCell.date.replace(
			'00:00:00',
			getTimeString(clickedCell.time + durationSum, true),
		)
		const newAppointment = {
			Id: uuidv4(),
			DateStart: dateStart,
			DateEnd: dateEnd,
			IdEmployee: null,
			IdClient: chosenClient,
			Services: checkedServices.map(s => ({
				IdService: s.id,
				Price: s.price,
			})),
			Deleted: false,
			Updated: false,
		}

		saveAppointment(newAppointment)
			.then(() => {
				props.refreshData()
				setCheckedServices([])
				infoHandler('Termin uspešno zakazan')
			})
			.catch(err => {
				console.log(err)
				const errMessage = getErrorMessage(err.response)
				resHandler(errMessage, 'red')
			})
	}

	const ServiceProviderCalendar = (
		<div
			className={classes.Calendar}
			style={{
				marginLeft: isMobile ? '5px' : '60px',
				width: isMobile ? '97%' : '92%',
			}}>
			{/* left tabel, fixed horizontaly, scrollable verticaly */}
			<table className={classes.calLeftTable}>
				<thead>
					<tr>
						<th>{currYear}</th>
					</tr>
				</thead>
				<tbody ref={cloneScrollTop}>
					<Time minMaxWorkingHours={minMaxHoursDisplay()} key={minMaxWorkingHours} />
				</tbody>
			</table>
			{/* right tabel, fixed verticaly, scrollable horizontaly */}
			<table className={classes.calRightTable}>
				<thead
					ref={cloneHeadScrollLeft}
					style={{
						width: isMobile ? '100%' : '97%',
					}}>
					<tr>
						<Days days={days} key={days} date={calendarHeaderDates} />
					</tr>
				</thead>
				<tbody
					ref={cloneDiv}
					style={{
						width: isMobile ? '100%' : '97%',
					}}
					onScroll={() => {
						VerticalTaxing()
						HorisontalTaxing()
					}}>
					{minMaxWorkingHours.map(time => (
						<CalBodyRow
							key={time}
							time={time}
							workHourAppointments={workHourAppointments}
							setClickedCell={setClickedCell}
							clientPicker={() => {
								setDisplayClientPicker('block')
								props.showBackdrop()
							}}
							resHandler={resHandler}
							infoHandler={infoHandler}
							confirmMessageHandler={confirmMessageHandler}
							setAppointmentId={setAppointmentId}
							setDisplayAppointmentsNote={setDisplayAppointmentsNote}
						/>
					))}
				</tbody>
			</table>
		</div>
	)

	return (
		<>
			<Loader loading={isLoading} />
			<InfoModal showInfoModal={showInfoModal} borderColor="green" />
			<ResponseModal showResponseModal={showResponseModal} />
			<ConfirmModal
				showConfirmModal={showConfirmModal}
				submitValue="Da"
				itemId={setAppointmentId}
				onSubmit={() => deleteAppointmentHandler()}
			/>
			<AppointmentNote
				displayAppointmentsNote={displayAppointmentsNote}
				setDisplayAppointmentsNote={setDisplayAppointmentsNote}
			/>
			<RegCodeClientForm
				displayRegCodeClient={displayRegCodeClient}
				RegCodeClientHandler={RegCodeClientHandler}
				setDisplayRegCodeClient={setDisplayRegCodeClient}
			/>
			<ClientPickerForm
				displayClientPicker={displayClientPicker}
				setDisplayClientPicker={setDisplayClientPicker}
				setDisplayServicesPicker={setDisplayServicesPicker}
				hideBackdrop={props.hideBackdrop}
				bodyDataMob={props.employees.map(user => (
					<div
						className={classesUI.ClientsMob}
						key={user.id}
						onClick={() => setDisplayServicesPicker('block')}>
						<tr>
							<td>{user.name}</td>
						</tr>
						<tr>
							<td>{user.phone}</td>
						</tr>
						<tr>
							<td>{user.email}</td>
						</tr>
					</div>
				))}
				bodyData={props.employees.map(user => (
					<tr
						className={classesUI.Clients}
						key={user.id}
						onClick={() => {
							setDisplayServicesPicker('block')
							setChosenClient(user.id)
						}}>
						<td>{user.name}</td>
						<td
							style={{
								width: '180px',
								minWidth: '180px',
							}}>
							{user.phone}
						</td>
						<td>{user.email}</td>
					</tr>
				))}
			/>
			<ServicePickerForm
				displayServicesPicker={displayServicesPicker}
				setDisplayServicesPicker={setDisplayServicesPicker}
				setDisplayClientPicker={setDisplayClientPicker}
				hideBackdrop={props.hideBackdrop}
				setAppointment={saveNewAppointment}
				setCheckedServices={setCheckedServices}
				bodyDataMob={props.services.map(serv => (
					<div className={classesUI.ServicesMob} key={serv.serviceId}>
						<tr>
							<td>{serv.name}</td>
							<td
								style={{
									width: '20%',
								}}
								rowSpan="2">
								<CheckBox
									name={serv.id}
									id={serv.id}
									className={classesUI.checkbox}
									onClick={() => pickServices(serv)}
									checked={isServiceChecked(serv)}
								/>
							</td>
						</tr>
						<tr>
							<td>{serv.duration}</td>
						</tr>
						<tr>
							<td>{serv.price}</td>
						</tr>
					</div>
				))}
				headData={
					<tr>
						<th
							style={{
								width: '100%',
							}}>
							NAZIV USLUGE
						</th>
						<th
							style={{
								width: '100px',
								minWidth: '150px',
							}}>
							DUŽINA
						</th>
						<th
							style={{
								width: '100px',
								minWidth: '150px',
							}}>
							CENA
						</th>
						<th
							style={{
								width: '100px',
								minWidth: '100px',
							}}>
							IZBOR
						</th>
					</tr>
				}
				bodyData={props.services.map(serv => (
					<tr key={serv.serviceId} className={classesUI.Services}>
						<td
							style={{
								width: '100%',
							}}>
							{serv.name}
						</td>
						<td
							style={{
								width: '100px',
								minWidth: '150px',
							}}>
							{serv.duration}
						</td>
						<td
							style={{
								width: '100px',
								minWidth: '150px',
							}}>
							{serv.price}
						</td>
						<td
							style={{
								width: '100px',
								minWidth: '100px',
							}}>
							<CheckBox
								name={serv.id}
								id={serv.id}
								className={classesUI.checkbox}
								onClick={() => pickServices(serv)}
								checked={isServiceChecked(serv)}
							/>
						</td>
					</tr>
				))}
			/>
			{BackdropSideDrawer}
			<CalNav
				leftArrow="<< nedelja"
				leftMargin={isMobile ? '5px 0 5px 5px' : '5px 0 5px 60px'}
				leftFloat="left"
				prevWeek={prevWeek}
				nextWeek={nextWeek}
				rightArrow="nedelja >>"
				rightMargin={isMobile ? '5px 2vw 5px 0' : '5px 5.2vw 5px 0'}
				rightFloat="right"
				currWeek={`${currMonday} - ${currSunday}`}
			/>
			{ServiceProviderCalendar}
		</>
	)
}

export default Calendar
