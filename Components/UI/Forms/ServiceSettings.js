import CheckBox from '../CheckBox';

import classes from '../../SetupForms/SetupForms.module.scss';

const ServiceSettings = props => {
	return (
		<div className={classes.ServiceSettingsContainer} style={{ display: props.display }}>
			<h1>Dodatna podešavanja</h1>
			{props.serviceSettings
				.filter(data => data.idService.includes(props.serviceId))
				.map(() => {
					return (
						<div className={classes.ServiceSettingsPairContainer} key={props.serviceId}>
							<div>
								<CheckBox
									name="omiljenaUsluga"
									className={props.addForSelectedClassName}
									defaultChecked={props.serviceSettingsData.favoriteService}
									onClick={() =>
										props.setServiceSettingsData({
											...props.serviceSettingsData,
											['favoriteService']: !props.serviceSettingsData.favoriteService,
										})
									}
								/>
								<p>Omiljena usluga?</p>
							</div>
							<div>
								<CheckBox
									name="izabranaUsluga"
									className={props.addForSelectedClassName}
									defaultChecked={props.serviceSettingsData.alwaysSelected}
									onClick={() =>
										props.setServiceSettingsData({
											...props.serviceSettingsData,
											['alwaysSelected']: !props.serviceSettingsData.alwaysSelected,
										})
									}
								/>
								<p>Uvek izabrana usluga?</p>
							</div>
							<div>
								<CheckBox
									name="koristimUslugu"
									className={props.addForSelectedClassName}
									defaultChecked={props.serviceSettingsData.serviceInUse}
									onClick={() =>
										props.setServiceSettingsData({
											...props.serviceSettingsData,
											['serviceInUse']: !props.serviceSettingsData.serviceInUse,
										})
									}
								/>
								<p>Koristim uslugu!</p>
							</div>
							<div>
								<CheckBox
									name="klijentiVideCenu"
									className={props.addForSelectedClassName}
									defaultChecked={props.serviceSettingsData.clientsSeePrice}
									onClick={() =>
										props.setServiceSettingsData({
											...props.serviceSettingsData,
											['clientsSeePrice']: !props.serviceSettingsData.clientsSeePrice,
										})
									}
								/>
								<p>Klijenti vide cenu usluge?</p>
							</div>
							<div>
								<CheckBox
									name="klijentiVideUslugu"
									className={props.addForSelectedClassName}
									defaultChecked={props.serviceSettingsData.clientsSeeService}
									onClick={() =>
										props.setServiceSettingsData({
											...props.serviceSettingsData,
											['clientsSeeService']: !props.serviceSettingsData.clientsSeeService,
										})
									}
								/>
								<p>Klijenti vide uslugu?</p>
							</div>
						</div>
					);
				})}

			<input
				type="button"
				value="Sačuvaj"
				className={classes.SaveServiceSettings}
				onClick={() => props.saveSettingsServicesHandler()}></input>
			<input
				type="button"
				value="Odustani"
				className={classes.CloseServiceSettings}
				onClick={() => {
					props.setDisplayServiceSettings('none');
					props.setServiceSettingsData({});
				}}></input>
		</div>
	);
};

export default ServiceSettings;
