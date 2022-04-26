import {
	useDeviceDetect,
	inputChangedHandlerArray,
	absenceHoursResetHandler,
	inputChangedHandlerCheckBox,
} from '../../helpers/universalFunctions';
import AbsenceRadio from './AbsenceRadio';
import TimeField from 'react-simple-timefield';

import classes from './SetupForms.module.scss';

const WorkingHoursBody = props => {
	const { isMobile } = useDeviceDetect();

	const displayOverlay = !props.employeeId ? 'block' : 'none';

	if (isMobile) {
		return (
			<div style={{ pointerEvents: props.employeeId ? 'auto' : 'none' }}>
				<div className={classes.WorkingTimeContainerMob}>
					<div className={classes.FormOverlayMob} style={{ display: displayOverlay }}></div>
					<div className={classes.WorkingTimeHead}>
						<div className={classes.DayTitleMob} style={{ width: '10vw' }}>
							<p>Dan</p>
						</div>
						<div style={{ width: '43.5vw' }}>Od</div>
						<div style={{ width: '43.5vw' }}>Do</div>
					</div>
					<div className={classes.WorkingTimeBodyMob}>
						{props.weekDays.map((day, i) => {
							const isId = props.workingTimeFormInput[i]?.id;
							return (
								<div key={day} className={classes.WorkingTimeBodyBlockMob}>
									<div className={classes.WorkingTimeDaysMob}>
										<p>{day.name}</p>
									</div>
									<div className={classes.WorkingTimeBlockMob}>
										<div className={classes.WorkingTimePairsContainerMob}>
											<TimeField
												value={props.workingTimeFormInput[i]?.firstStartHour} // {String}   required, format '00:00' or '00:00:00'
												className={classes.WorkingTimePairsMob}
												onChange={e =>
													inputChangedHandlerArray(
														e,
														'firstStartHour',
														props.setWorkingTimeFormInput,
														props.workingTimeFormInput[i]?.id
													)
												}
												colon=":"
												showSeconds={false}
												style={{ marginRight: '4%' }}
											/>
											<TimeField
												value={props.workingTimeFormInput[i]?.firstEndHour}
												className={classes.WorkingTimePairsMob}
												showSeconds={false}
												colon=":"
												onChange={e =>
													inputChangedHandlerArray(
														e,
														'firstEndHour',
														props.setWorkingTimeFormInput,
														props.workingTimeFormInput[i]?.id
													)
												}
												style={{ marginLeft: '4%' }}
											/>
										</div>
										<div className={classes.WorkingTimePairsContainerMob}>
											<TimeField
												value={props.workingTimeFormInput[i]?.secondStartHour} // {String}   required, format '00:00' or '00:00:00'
												className={classes.WorkingTimePairsMob}
												onChange={e =>
													inputChangedHandlerArray(
														e,
														'secondStartHour',
														props.setWorkingTimeFormInput,
														props.workingTimeFormInput[i]?.id
													)
												}
												colon=":"
												showSeconds={false}
												style={{ marginRight: '4%' }}
											/>
											<TimeField
												value={props.workingTimeFormInput[i]?.secondEndHour}
												className={classes.WorkingTimePairsMob}
												showSeconds={false}
												colon=":"
												onChange={e =>
													inputChangedHandlerArray(
														e,
														'secondEndHour',
														props.setWorkingTimeFormInput,
														props.workingTimeFormInput[i]?.id
													)
												}
												style={{ marginLeft: '4%' }}
											/>
										</div>

										<div className={classes.AbsencePairsContainer}>
											<div className={classes.AbsenceRadioContainerMob}>
												<div className={classes.Radio_p_ContainerMob}>
													<AbsenceRadio
														htmlFor={`${day.date}prvi`}
														name={day.name}
														id={`${day.date}prvi`}
														defaultChecked={props.workingTimeFormInput[i]?.idAbsenceType === 0}
														onClick={() =>
															inputChangedHandlerCheckBox(
																0,
																'idAbsenceType',
																props.setWorkingTimeFormInput,
																isId.length > 1 ? isId : parseInt(i) + 1
															)
														}
													/>
													<p>Nema odsustva</p>
												</div>
												<div className={classes.Radio_p_ContainerMob}>
													<AbsenceRadio
														htmlFor={`${day.date}${1}`}
														name={day.name}
														id={`${day.date}${1}`}
														defaultChecked={props.workingTimeFormInput[i]?.idAbsenceType === 1}
														onClick={() => {
															inputChangedHandlerCheckBox(
																1,
																'idAbsenceType',
																props.setWorkingTimeFormInput,
																isId.length > 1 ? isId : parseInt(i) + 1
															),
																absenceHoursResetHandler(
																	'firstStartHour',
																	props.setWorkingTimeFormInput,
																	props.workingTimeFormInput[i]?.id
																),
																absenceHoursResetHandler(
																	'firstEndHour',
																	props.setWorkingTimeFormInput,
																	props.workingTimeFormInput[i]?.id
																),
																absenceHoursResetHandler(
																	'secondStartHour',
																	props.setWorkingTimeFormInput,
																	props.workingTimeFormInput[i]?.id
																),
																absenceHoursResetHandler(
																	'secondEndHour',
																	props.setWorkingTimeFormInput,
																	props.workingTimeFormInput[i]?.id
																);
														}}
													/>
													<p>Godišnji odmor</p>
												</div>
											</div>
											<da className={classes.Spacer}></da>
											<div className={classes.AbsenceRadioContainerMob}>
												<div className={classes.Radio_p_ContainerMob}>
													<AbsenceRadio
														htmlFor={`${day.date}${2}`}
														name={day.name}
														id={`${day.date}${2}`}
														defaultChecked={props.workingTimeFormInput[i]?.idAbsenceType === 2}
														onClick={() => {
															inputChangedHandlerCheckBox(
																2,
																'idAbsenceType',
																props.setWorkingTimeFormInput,
																isId.length > 1 ? isId : parseInt(i) + 1
															),
																absenceHoursResetHandler(
																	'firstStartHour',
																	props.setWorkingTimeFormInput,
																	props.workingTimeFormInput[i]?.id
																),
																absenceHoursResetHandler(
																	'firstEndHour',
																	props.setWorkingTimeFormInput,
																	props.workingTimeFormInput[i]?.id
																),
																absenceHoursResetHandler(
																	'secondStartHour',
																	props.setWorkingTimeFormInput,
																	props.workingTimeFormInput[i]?.id
																),
																absenceHoursResetHandler(
																	'secondEndHour',
																	props.setWorkingTimeFormInput,
																	props.workingTimeFormInput[i]?.id
																);
														}}
													/>
													<p>Praznik</p>
												</div>
												<div className={classes.Radio_p_ContainerMob}>
													<AbsenceRadio
														htmlFor={`${day.date}${3}`}
														name={day.name}
														id={`${day.date}${3}`}
														defaultChecked={props.workingTimeFormInput[i]?.idAbsenceType === 3}
														onClick={() => {
															inputChangedHandlerCheckBox(
																3,
																'idAbsenceType',
																props.setWorkingTimeFormInput,
																isId.length > 1 ? isId : parseInt(i) + 1
															),
																absenceHoursResetHandler(
																	'firstStartHour',
																	props.setWorkingTimeFormInput,
																	props.workingTimeFormInput[i]?.id
																),
																absenceHoursResetHandler(
																	'firstEndHour',
																	props.setWorkingTimeFormInput,
																	props.workingTimeFormInput[i]?.id
																),
																absenceHoursResetHandler(
																	'secondStartHour',
																	props.setWorkingTimeFormInput,
																	props.workingTimeFormInput[i]?.id
																),
																absenceHoursResetHandler(
																	'secondEndHour',
																	props.setWorkingTimeFormInput,
																	props.workingTimeFormInput[i]?.id
																);
														}}
													/>
													<p>Bolovanje</p>
												</div>
											</div>
											<div className={classes.AbsenceRadioContainer}></div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className={classes.WorkingTimeContainer}>
				<div className={classes.FormOverlay} style={{ display: displayOverlay }}></div>
				<div className={classes.WorkingTimeHead}>
					<div className={classes.WorkingTimeHead} style={{ width: '7vw' }}>
						Dan
					</div>
					<div className={classes.WorkingTimeHead} style={{ width: '30vw' }}>
						Prvi deo
					</div>
					<div className={classes.WorkingTimeHead} style={{ width: '30vw' }}>
						Drugi deo
					</div>
					<div className={classes.WorkingTimeHead} style={{ width: '33vw' }}>
						Odsustvo
					</div>
				</div>
				<div className={classes.WorkingTimeBody}>
					<div className={classes.WorkingTimeDays}>
						{props.weekDays.map(day => {
							return <div key={day}>{day.name}</div>;
						})}
					</div>
					<div className={classes.WorkingTimeBlock}>
						{props.weekDays.map((day, i) => {
							return (
								<div className={classes.WorkingTimePairsContainer} key={day.id}>
									<TimeField
										value={props.workingTimeFormInput[i]?.firstStartHour} // {String}   required, format '00:00' or '00:00:00'
										className={classes.WorkingTimePairs}
										onChange={e =>
											inputChangedHandlerArray(
												e,
												'firstStartHour',
												props.setWorkingTimeFormInput,
												props.workingTimeFormInput[i]?.id
											)
										}
										colon=":"
										showSeconds={false}
									/>
									<p className={classes.WorkingTimePairsLine}>-</p>
									<TimeField
										value={props.workingTimeFormInput[i]?.firstEndHour}
										className={classes.WorkingTimePairs}
										showSeconds={false}
										colon=":"
										onChange={e =>
											inputChangedHandlerArray(
												e,
												'firstEndHour',
												props.setWorkingTimeFormInput,
												props.workingTimeFormInput[i]?.id
											)
										}
									/>
								</div>
							);
						})}
					</div>
					<div className={classes.WorkingTimeBlock}>
						{props.weekDays.map((day, i) => {
							return (
								<div className={classes.WorkingTimePairsContainer} key={day.id}>
									<TimeField
										value={props.workingTimeFormInput[i]?.secondStartHour}
										className={classes.WorkingTimePairs}
										showSeconds={false}
										colon=":"
										onChange={e =>
											inputChangedHandlerArray(
												e,
												'secondStartHour',
												props.setWorkingTimeFormInput,
												props.workingTimeFormInput[i]?.id
											)
										}
									/>
									<p className={classes.WorkingTimePairsLine}>-</p>
									<TimeField
										value={props.workingTimeFormInput[i]?.secondEndHour}
										className={classes.WorkingTimePairs}
										showSeconds={false}
										colon=":"
										onChange={e =>
											inputChangedHandlerArray(
												e,
												'secondEndHour',
												props.setWorkingTimeFormInput,
												props.workingTimeFormInput[i]?.id
											)
										}
									/>
								</div>
							);
						})}
					</div>
					<div className={classes.WorkingTimeAbsence}>
						{props.weekDays.map((day, i) => {
							const isId = props.workingTimeFormInput[i]?.id;
							return (
								<div className={classes.AbsencePairsContainer} key={day.id}>
									<div className={classes.AbsenceRadioContainer}>
										<div className={classes.Radio_p_Container}>
											<AbsenceRadio
												htmlFor={`${day.date}prvi`}
												name={day.name}
												id={`${day.date}prvi`}
												defaultChecked={props.workingTimeFormInput[i]?.idAbsenceType === 0}
												onClick={() =>
													inputChangedHandlerCheckBox(
														0,
														'idAbsenceType',
														props.setWorkingTimeFormInput,
														isId.length > 1 ? isId : parseInt(i) + 1
													)
												}
											/>
											<p>Nema odsustva</p>
										</div>
										<div className={classes.Radio_p_Container}>
											<AbsenceRadio
												htmlFor={`${day.date}drugi`}
												name={day.name}
												id={`${day.date}drugi`}
												defaultChecked={props.workingTimeFormInput[i]?.idAbsenceType === 1}
												onClick={() => {
													inputChangedHandlerCheckBox(
														1,
														'idAbsenceType',
														props.setWorkingTimeFormInput,
														isId.length > 1 ? isId : parseInt(i) + 1
													),
														absenceHoursResetHandler(
															'firstStartHour',
															props.setWorkingTimeFormInput,
															props.workingTimeFormInput[i]?.id
														),
														absenceHoursResetHandler(
															'firstEndHour',
															props.setWorkingTimeFormInput,
															props.workingTimeFormInput[i]?.id
														),
														absenceHoursResetHandler(
															'secondStartHour',
															props.setWorkingTimeFormInput,
															props.workingTimeFormInput[i]?.id
														),
														absenceHoursResetHandler(
															'secondEndHour',
															props.setWorkingTimeFormInput,
															props.workingTimeFormInput[i]?.id
														);
												}}
											/>
											<p>Godišnji odmor</p>
										</div>
									</div>
									<da className={classes.Spacer}></da>
									<div className={classes.AbsenceRadioContainer}>
										<div className={classes.Radio_p_Container}>
											<AbsenceRadio
												htmlFor={`${day.date}treci`}
												name={day.name}
												id={`${day.date}treci`}
												defaultChecked={props.workingTimeFormInput[i]?.idAbsenceType === 2}
												onClick={() => {
													inputChangedHandlerCheckBox(
														2,
														'idAbsenceType',
														props.setWorkingTimeFormInput,
														isId.length > 1 ? isId : parseInt(i) + 1
													),
														absenceHoursResetHandler(
															'firstStartHour',
															props.setWorkingTimeFormInput,
															props.workingTimeFormInput[i]?.id
														),
														absenceHoursResetHandler(
															'firstEndHour',
															props.setWorkingTimeFormInput,
															props.workingTimeFormInput[i]?.id
														),
														absenceHoursResetHandler(
															'secondStartHour',
															props.setWorkingTimeFormInput,
															props.workingTimeFormInput[i]?.id
														),
														absenceHoursResetHandler(
															'secondEndHour',
															props.setWorkingTimeFormInput,
															props.workingTimeFormInput[i]?.id
														);
												}}
											/>
											<p>Praznik</p>
										</div>
										<div className={classes.Radio_p_Container}>
											<AbsenceRadio
												htmlFor={`${day.date}cetvrti`}
												name={day.name}
												id={`${day.date}cetvrti`}
												defaultChecked={props.workingTimeFormInput[i]?.idAbsenceType === 3}
												onClick={() => {
													inputChangedHandlerCheckBox(
														3,
														'idAbsenceType',
														props.setWorkingTimeFormInput,
														isId.length > 1 ? isId : parseInt(i) + 1
													),
														absenceHoursResetHandler(
															'firstStartHour',
															props.setWorkingTimeFormInput,
															props.workingTimeFormInput[i]?.id
														),
														absenceHoursResetHandler(
															'firstEndHour',
															props.setWorkingTimeFormInput,
															props.workingTimeFormInput[i]?.id
														),
														absenceHoursResetHandler(
															'secondStartHour',
															props.setWorkingTimeFormInput,
															props.workingTimeFormInput[i]?.id
														),
														absenceHoursResetHandler(
															'secondEndHour',
															props.setWorkingTimeFormInput,
															props.workingTimeFormInput[i]?.id
														);
												}}
											/>
											<p>Bolovanje</p>
										</div>
									</div>
									<div className={classes.AbsenceRadioContainer}></div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
};

export default WorkingHoursBody;
