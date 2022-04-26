//REFAKTORISANO
import { useDeviceDetect } from '../../helpers/universalFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import classes from './UI.module.scss';

const AddClientButton = (props) => {
    const { isMobile } = useDeviceDetect();
    return (
        <FontAwesomeIcon
            className={isMobile ? classes.AddClientButtonMob : classes.AddClientButton}
            icon={faPaperPlane}
            onClick={props.onClick}
        />
    );
};

export default AddClientButton;
