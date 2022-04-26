import { useState } from 'react'
import Appointment from './Appointment'
import classes from '../../Calendar.module.scss'
import { isObjEmpty, getTimeString } from '../../../../helpers/universalFunctions'
import AppointmentOptions from './AppointmentOptions'

const CalBodyCol = ({
	date,
	time,
	enabled,
	absence,
	appointment,
	clientPicker,
	setClickedCell,
	getErrorMessage,
	resHandler,
	confirmMessageHandler,
	setAppointmentId,
	setDisplayAppointmentsNote,
}) => {
	const [showOptions, setShowOptions] = useState('none')

	const onClick = () => {
		const dateStart = date.replace('00:00:00', getTimeString(time, true))
		const mDateStart = Date.parse(dateStart)
		const mCurrentDateTime = Date.now()
		if (mDateStart > mCurrentDateTime || !isObjEmpty(appointment))
			if (enabled && isObjEmpty(appointment)) {
				clientPicker()
				setClickedCell(clickedCellState => ({
					...clickedCellState,
					time: time,
					date: date,
				}))
			} else {
				null
			}
		else resHandler('Nije moguće zakazati termin u vreme koje je prošlo!', 'red')
	}

	const getAppointmentTime = () => {
		if (!isObjEmpty(appointment)) {
			const timeStart = appointment.dateStart.split('T')[1]
			const timeEnd = appointment.dateEnd.split('T')[1]
			return `${timeStart.substring(0, 5)} - ${timeEnd.substring(0, 5)}`
		}
	}

	const appointmentContent = () => {
		return (
			<>
				<h5>{getAppointmentTime()}</h5>
				<h5>{appointment.clientName}</h5>
				<h5>{appointment.clientPhone}</h5>
				<hr className={classes.HrLineAppointment} />
			</>
		)
	}

	return (
		<>
			<td
				className={enabled ? classes.CellEnabled : classes.CellDisabled}
				onClick={() => onClick()}>
				<p style={{ display: isObjEmpty(appointment) ? 'flex' : 'none' }}>
					{!enabled ? 'zatvoreno' : 'rezerviši termin'}
				</p>

				<Appointment
					display={isObjEmpty(appointment) ? 'none' : 'flex'}
					height={`150px`}
					className={classes.Appointment}
					onMouseEnter={() => setShowOptions('flex')}
					onMouseLeave={() => setShowOptions('none')}>
					{appointmentContent()}
					<AppointmentOptions
						display={showOptions}
						onClickDelete={() => {
							confirmMessageHandler('Da li ste sigurni da želite obrisati termin?')
							setAppointmentId(appointment.id)
						}}
						onClickEdit={() => setDisplayAppointmentsNote('block')}
					/>
					{!isObjEmpty(appointment) &&
						appointment.services.map((s, i) => {
							return <h5 key={i}>{`${s.serviceName} (${s.price} din)`}</h5>
						})}
				</Appointment>
			</td>
		</>
	)
}

export default CalBodyCol
