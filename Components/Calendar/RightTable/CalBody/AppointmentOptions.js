import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

import classes from '../../Calendar.module.scss'

const AppointmentOptions = (props) => {
  return (
    <div
      className={classes.OptionsContainer}
      style={{ display: props.display }}
    >
      <div className={classes.IconContainer} onClick={props.onClickDelete}>
        <FontAwesomeIcon icon={faTrashAlt} className={classes.OptionIcon} />
      </div>
      <div className={classes.IconContainer} onClick={props.onClickEdit}>
        <FontAwesomeIcon icon={faPencilAlt} className={classes.OptionIcon} />
      </div>
    </div>
  )
}

export default AppointmentOptions
