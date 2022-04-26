import { useDeviceDetect, checkBoxGroupToArrayHandler } from '../../helpers/universalFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import Input from '../UI/Forms/Input';
import Label from '../UI/Forms/Label';

import classes from './SetupForms.module.scss';

const ServicesList = props => {
	const { isMobile } = useDeviceDetect();

	const listItems = props.listOfEmployees.map(user => {
		return (
			<tr key={user.id} style={{ display: props.listOfEmployees.length === 0 ? 'none' : 'flex' }}>
				<td
					style={{ display: 'flex' /* props.displayCheckBox */ }}
					className={classes.CheckBoxTdHead}>
					<Input
						type="checkbox"
						id={`${user.id}/${props.component}`}
						className={props.addForSelectedClassName}
						onChange={e =>
							checkBoxGroupToArrayHandler(e, props.checkedEmployees, props.setCheckedEmployees)
						}
					/>
					<Label htmlFor={`${user.id}/${props.component}`} display={props.displayCheckBox} />
				</td>
				<td style={{ display: user.serviceProviderName ? 'block' : 'none' }}>
					{user.serviceProviderName}
				</td>
				<td>{user.name}</td>
				<td className={classes.IconTd}>
					<FontAwesomeIcon
						icon={faPencilAlt}
						className={classes.SetupGuidIcon}
						style={{ display: props.displayEdit }}
						onClick={() => {
							props.setId(user.id);
						}}
					/>
				</td>
				<td className={classes.IconTd}>
					<FontAwesomeIcon
						icon={faTrashAlt}
						className={classes.SetupGuidIcon}
						style={{ display: props.displayDelete, color: 'red' }}
						/* onClick={props.onDelete} */
					/>
				</td>
			</tr>
		);
	});

	return (
		<div className={isMobile ? classes.ReviewMob : classes.Review}>
			<h4>{props.title}</h4>
			<div style={{ display: props.listOfUsers.length === 0 ? 'block' : 'none' }}>
				Izaberite salon
			</div>
			<table className={classes.SetupGuideListContainer}>
				<tbody>
					<tr style={{ display: props.listOfUsers.length === 0 ? 'none' : 'block' }}>
						<th
							className={classes.CheckBoxTdHead}
							style={{
								width: '30px !important',
								maxWidth: '30px !important',
								minWidth: '30px !important',
							}}>
							X
						</th>
						<th>Naziv Salona</th>
						<th
							style={{
								display: props.employeesPreview,
								width: '2000px !important',
								maxWidth: '400px !important',
								minWidth: '220px !important',
							}}>
							Ime radnika
						</th>
						<th className={classes.IconTdHead}>Izmeni</th>
						<th className={classes.IconTdHead}>Obriši</th>
					</tr>
					{listItems}
				</tbody>
			</table>
		</div>
	);
};

export default ServicesList;
