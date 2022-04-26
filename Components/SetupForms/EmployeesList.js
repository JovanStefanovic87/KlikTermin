import { useState } from 'react';
import { useDeviceDetect } from '../../helpers/universalFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ArrowRightOutlined, PlusOutlined, SaveOutlined, ToolOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import classes from './SetupForms.module.scss';
import ToolBox from '../UI/ToolBox';

const EmployeesList = props => {
	const { isMobile } = useDeviceDetect();
	const [userForEdit, setUserForEdit] = useState('');

	function editHandler(filteredEmployee) {
		props.setId(filteredEmployee.id);
		props.setDisplayToolBox('flex');
		setUserForEdit(filteredEmployee.name);
	}

	function editFormHandler() {
		props.setEditMode(true);
		props.setDisplayToolBox('none');
	}

	const listItems = props.listOfEmployees
		.filter(user => user.serviceProviderId.includes(props.selectedServiceProvider))
		.map(filteredEmployee => {
			if (isMobile) {
				return (
					<tr
						key={filteredEmployee.id}
						style={{ display: filteredEmployee === 0 ? 'none' : 'flex' }}>
						<td>{filteredEmployee.name}</td>

						{/* <td className={classes.ToolBoxButton} onClick={() => editHandler(filteredEmployee)}>
							<ToolOutlined />
						</td> */}
					</tr>
				);
				/*{
					 <td className={classes.IconTd}>
							<FontAwesomeIcon
								icon={faPencilAlt}
								className={classes.SetupGuidIcon}
								style={{ display: props.displayEdit }}
								onClick={() => {
									props.setId(filteredEmployee.id), props.setEditMode(true);
								}}
							/>
							
						</td>
						<td className={classes.IconTd}>
							<FontAwesomeIcon
								icon={faTrashAlt}
								className={classes.SetupGuidIcon}
								style={{ display: props.displayDelete, color: 'red' }}
								onClick={props.onDelete} 
								/>
								</td> 
				}*/
			} else {
				return (
					<tr
						key={filteredEmployee.id}
						style={{ display: filteredEmployee === 0 ? 'none' : 'flex' }}>
						<td>{filteredEmployee.name}</td>
						{/* <td style={{ display: user.serviceProviderName ? 'block' : 'none' }}>
							{user.serviceProviderName}
						</td> */}
						{/* <td className={classes.IconTd}>
							<FontAwesomeIcon
								icon={faPencilAlt}
								className={classes.SetupGuidIcon}
								style={{ display: props.displayEdit }}
								onClick={() => {
									props.setEditMode(true);
									props.setId(filteredEmployee.id);
								}}
							/>
						</td>
						<td className={classes.IconTd}>
							<FontAwesomeIcon
								icon={faTrashAlt}
								className={classes.SetupGuidIcon}
								style={{ display: props.displayDelete, color: 'red' }}
								onClick={props.onDelete}
							/>
						</td> */}
					</tr>
				);
			}
		});

	if (isMobile) {
		return (
			<>
				<ToolBox
					displayToolBox={props.displayToolBox}
					setDisplayToolBox={props.setDisplayToolBox}
					userForEdit={userForEdit}
					onEdit={() => editFormHandler()}
				/>
				<div className={classes.ReviewMob}>
					<h4>Lista radnika</h4>
					<div style={{ display: listItems.length === 0 ? 'block' : 'none' }}>
						{props.emptyListMessage}
					</div>
					<div
						style={{ display: props.listOfEmployees.length === 0 ? 'block' : 'none' }}
						className={classes.EmptyListMessage}>
						Namate unetih radnika. Potrebno je da unesete minimum jednog radnika
					</div>
					<table className={classes.SetupGuideListContainerMob}>
						<tbody>{listItems}</tbody>
					</table>
				</div>
			</>
		);
	} else {
		return (
			<div className={classes.ReviewMob}>
				<h4>Vaši radnici</h4>
				<div
					style={{ display: props.listOfEmployees.length === 0 ? 'block' : 'none' }}
					className={classes.EmptyListMessage}>
					Namate unetih radnika. Potrebno je da unesete minimum jednog radnika
				</div>
				<table className={classes.SetupGuideListContainer}>
					<tbody>
						<tr style={{ display: props.listOfEmployees.length === 0 ? 'none' : 'block' }}>
							{/* <th
							 style={
									{
										width: '100% !important',
										 maxWidth: '400px !important',
									minWidth: '220px !important',
									}
								}
							>
								Ime radnika
							</th> */}
							{/* <th
								style={{
									display: props.employeesPreview,
									width: '50% !important',
									maxWidth: '400px !important',
									minWidth: '220px !important',
								}}>
								Naziv Salona
							</th> */}
							{/* <th className={classes.IconTdHead}>Izmeni</th>
							<th className={classes.IconTdHead}>Obriši</th> */}
							Ime radnika
						</tr>
						{listItems}
					</tbody>
				</table>
			</div>
		);
	}
};

export default EmployeesList;
