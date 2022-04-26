import { useDeviceDetect } from '../../helpers/universalFunctions';
import Logo from '../Logo/Logo';
import HamburgerButton from './HamburgerButton';
import Select from '../UI/Select';
import PrepaidStatus from '../UI/PrepaidStatus';
import Distancer from '../UI/Distancer';

import classes from './Navigation.module.scss';

const Toolbar = (props) => {
    const { isMobile } = useDeviceDetect();

    const adminList = () => {
        if (props.selectData !== null) {
            return props.selectData.map((user, i) => (
                <option key={i} value={user.id}>
                    {user.name}
                </option>
            ));
        }
        return null;
    };

    if (isMobile) {
        return (
            <header className={classes.Header}>
                <HamburgerButton onClick={() => props.sideDrawerOpen()} display={props.displayHamButton} />
                <Distancer />
                <div className={classes.LogoMob}>
                    <Logo width="160" height="40" />
                </div>
            </header>
        );
    } else {
        return (
            <header className={classes.Header}>
                <Select
                    displaySelect={props.displaySelect}
                    className={props.classNameEmployeeSelect}
                    idSelect={props.idSelect}
                    name="employeeId"
                    value={props.selectedEmployee}
                    onChange={(e) => props.setSelectedEmployee(e.target.value)}
                >
                    {adminList()}
                </Select>
                <PrepaidStatus
                    display={props.displayNotifLabel}
                    className={classes.PrepaidStatus}
                    label="Paket ističe za"
                    trigger={14}
                    current={props.license}
                    days="dana"
                />
                <PrepaidStatus
                    display={props.displayNotifLabel}
                    className={classes.PrepaidStatus}
                    label="SMS poruke:"
                    trigger={50}
                    current={props.sms}
                />
                <Distancer />
                <div className={classes.LogoPC}>
                    <Logo width="250" height="60" />
                </div>
            </header>
        );
    }
};

export default Toolbar;
