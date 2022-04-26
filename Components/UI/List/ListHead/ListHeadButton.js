import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

import classes from '../../UI.module.scss';

const ListHeadButton = (props) => (
    <i className={props.className} style={{ display: props.display }} onClick={props.onClick}>
        {props.value}
        <FontAwesomeIcon
            icon={props.faIcon ? props.faIcon : faSave}
            className={[classes.Icon, props.IconClassName].join(' ')}
        />
    </i>
);

export default ListHeadButton;
