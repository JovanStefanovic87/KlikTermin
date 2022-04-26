import {
  useDeviceDetect,
  checkBoxGroupToArrayHandler,
} from '../../helpers/universalFunctions'
import CheckBox from '../UI/CheckBox'

import classes from './SetupForms.module.scss'

const EmployeesPicker = (props) => {
  const { isMobile } = useDeviceDetect()

  const displayEmployeesHeader = () => {
    if (listItems.length === 0 && !props.editMode) {
      return 'block'
    } else return 'none'
  }
  const displayEmployees = () => {
    if (listItems.length > 0 || props.editMode) {
      return 'block'
    } else return 'none'
  }

  const listItems = props.listOfEmployees
    .filter((user) =>
      user.serviceProviderId.includes(props.selectedServiceProvider),
    )
    .map((filteredEmployee) => {
      return (
        <tr
          key={filteredEmployee.id}
          style={{
            display: props.listOfEmployees.length === 0 ? 'none' : 'flex',
          }}
        >
          <td>{filteredEmployee.name}</td>
          <td
            className={classes.IconTdEmployeesPicker}
            onChange={(e) =>
              checkBoxGroupToArrayHandler(
                e,
                props.checkedEmployees,
                props.setCheckedEmployees,
              )
            }
          >
            <CheckBox
              name={filteredEmployee.id}
              /* id={filteredEmployee.id} */
              className={props.addForSelectedClassName}
              defaultChecked={
                props.checkedEmployees.includes(filteredEmployee.id)
                  ? true
                  : false
              }
            />
          </td>
        </tr>
      )
    })

  const checkedEmployeesList = props.listOfEmployees.map((employee) => {
    return (
      <tr
        key={employee.id}
        style={{ display: !props.editMode ? 'none' : 'flex' }}
      >
        <td>{employee.name}</td>
        <td
          className={classes.IconTdEmployeesPicker}
          onChange={(e) =>
            checkBoxGroupToArrayHandler(
              e,
              props.checkedEmployees,
              props.setCheckedEmployees,
            )
          }
        >
          <CheckBox
            /* name={`${employee.id}${props.tag}`} */
            name={employee.id}
            id={employee.id}
            className={props.addForSelectedClassName}
            defaultChecked={
              props.checkedEmployees.includes(employee.id) ? true : false
            }
          />
        </td>
      </tr>
    )
  })

  /* 	const checkedEmployeesList = props.checkedEmployees.map(employee => {
		console.log(employee);
		return (
			<tr key={employee.id} style={{ display: !props.editMode ? 'none' : 'flex' }}>
				<td>{employee.name}</td>
				<td
					className={classes.IconTdEmployeesPicker}
					onChange={e =>
						checkBoxGroupToArrayHandler(e, props.checkedEmployees, props.setCheckedEmployees)
					}>
					<Input
						type="checkbox"
						id={employee.id}
						className={props.addForSelectedClassName}
						checked={true}
					/>
					<Label htmlFor={employee.id} display={props.displayCheckBox} />
				</td>
			</tr>
		);
	}); */

  return (
    <div
      className={isMobile ? classes.ReviewMob : classes.Review}
      style={{ display: props.displayEmployeesPicker }}
    >
      <h4>{props.title}</h4>
      <div style={{ display: displayEmployeesHeader() }}>
        {props.emptyListMessage}
      </div>
      <table
        className={classes.SetupGuideListContainer}
        style={{ display: displayEmployees() }}
      >
        <tbody>
          <tr>
            <th
              style={{
                display: props.employeesPreview,
                width: '100% !important',
                maxWidth: '800px !important',
                minWidth: '220px !important',
              }}
            >
              Ime radnika
            </th>
            <th className={classes.IconTdHead}>Izbor</th>
          </tr>
          {listItems}
          {checkedEmployeesList}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeesPicker
