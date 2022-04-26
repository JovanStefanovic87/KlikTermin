import { useDeviceDetect } from '../../helpers/universalFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faAddressBook, faCut, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { userLogOut } from '../../api/userLogOut';
import NavItems from './NavItems';
import NavItem from './NavItem';
import ServiceProviderLogo from '../UI/ServiceProviderLogo';
import Backdrop from '../UI/Backdrop';
import Input from '../UI/Forms/Input';

import classes from './Navigation.module.scss';

const SideDrawer = (props) => {
    const { isMobile } = useDeviceDetect();

    if (isMobile) {
        return (
            <>
                <Backdrop
                    display="block"
                    onClick={() => props.sideDrawerCloseHandler()}
                    backdropAnimation={props.showBackdrop}
                />
                <div
                    className={classes.SideDrawerMob}
                    style={{ transform: props.transform, display: props.displayMob }}
                >
                    <div className={props.styleLogo} style={{ display: props.displayLogo }} />
                    <nav>
                        <NavItems>
                            <div>
                                <NavItem display="block" className={classes.NavItemServiceProviderMob} link="/kalendar">
                                    <div>
                                        <FontAwesomeIcon
                                            icon={faCalendarAlt}
                                            className={classes.sideDrawerIconMob}
                                            style={{ color: props.colorCalIcon }}
                                        />
                                        <p>Kalendar</p>
                                    </div>
                                </NavItem>
                                <NavItem display="block" className={classes.NavItemServiceProviderMob} link="/klijenti">
                                    <div>
                                        <FontAwesomeIcon
                                            icon={faAddressBook}
                                            className={classes.sideDrawerIconMob}
                                            style={{ color: props.colorClientsIcon }}
                                        />
                                        <p>Lista klijenata</p>
                                    </div>
                                </NavItem>
                                <NavItem display="block" className={classes.NavItemServiceProviderMob} link="/usluge">
                                    <div>
                                        <FontAwesomeIcon
                                            icon={faCut}
                                            className={classes.sideDrawerIconMob}
                                            style={{ color: props.colorServicesIcon }}
                                        />
                                        <p>Usluge</p>
                                    </div>
                                </NavItem>
                                <NavItem display="block" className={classes.NavItemServiceProviderMob} link="/profil">
                                    <div>
                                        <FontAwesomeIcon
                                            icon={faCog}
                                            className={classes.sideDrawerIconMob}
                                            style={{ color: props.colorSettingsIcon }}
                                        />
                                        <p>Moj profil</p>
                                    </div>
                                </NavItem>
                                <NavItem
                                    display="block"
                                    className={classes.NavItemServiceProviderMob}
                                    link="/"
                                    onClick={() => userLogOut()}
                                >
                                    <div>
                                        <FontAwesomeIcon
                                            icon={faSignOutAlt}
                                            className={classes.sideDrawerIconMob}
                                            /* style={{ color: props.colorSettingsIcon }} */
                                        />
                                        <p>Odjava</p>
                                    </div>
                                </NavItem>
                            </div>
                        </NavItems>

                        <ServiceProviderLogo
                            src={props.src}
                            salonName={props.salonName}
                            className={classes.ServiceProviderLogoMob}
                        />
                    </nav>
                </div>
            </>
        );
    } else {
        return (
            <div className={classes.SideDrawerPC} style={{ display: props.displayPC }}>
                <nav>
                    <NavItems>
                        <div>
                            <NavItem display="block" className={classes.NavItemServiceProviderPC} link="/kalendar">
                                <Input type="button" value="Kalendar" className={props.classNameCal} fontSize="1rem" />
                            </NavItem>
                            <FontAwesomeIcon
                                icon={faCalendarAlt}
                                className={classes.sideDrawerIconPC}
                                style={{ color: props.colorCalIcon }}
                            />
                            <NavItem display="block" className={classes.NavItemServiceProviderPC} link="/klijenti">
                                <Input
                                    type="button"
                                    value="Lista klijenata"
                                    className={props.classNameClients}
                                    fontSize="1rem"
                                />
                            </NavItem>
                            <FontAwesomeIcon
                                icon={faAddressBook}
                                className={classes.sideDrawerIconPC}
                                style={{ color: props.colorClientsIcon }}
                            />
                            <NavItem display="block" className={classes.NavItemServiceProviderPC} link="/usluge">
                                <Input
                                    type="button"
                                    value="Lista usluga"
                                    className={props.classNameServices}
                                    fontSize="1rem"
                                />
                            </NavItem>
                            <FontAwesomeIcon
                                icon={faCut}
                                className={classes.sideDrawerIconPC}
                                style={{ color: props.colorServicesIcon }}
                            />
                            <NavItem display="block" className={classes.NavItemServiceProviderPC} link="/profil">
                                <Input
                                    type="button"
                                    value="Moj profil"
                                    className={props.classNameProfile}
                                    fontSize="1rem"
                                />
                            </NavItem>
                            <FontAwesomeIcon
                                icon={faCog}
                                className={classes.sideDrawerIconPC}
                                style={{ color: props.colorProfileIcon }}
                            />
                            <NavItem
                                display="block"
                                className={classes.NavItemServiceProviderPC}
                                link="/"
                                onClick={() => userLogOut()}
                            >
                                <Input
                                    type="button"
                                    value="Odajava"
                                    className={props.classNameProfile}
                                    fontSize="1rem"
                                />
                            </NavItem>
                            <FontAwesomeIcon
                                icon={faSignOutAlt}
                                className={classes.sideDrawerIconPC}
                                style={{ color: props.colorProfileIcon }}
                            />
                        </div>
                    </NavItems>
                    <ServiceProviderLogo
                        src={props.src}
                        salonName={props.salonName}
                        className={classes.ServiceProviderLogoPC}
                    />
                </nav>
            </div>
        );
    }
};

export default SideDrawer;
