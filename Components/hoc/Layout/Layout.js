import { useState } from 'react';
import Toolbar from '../../Navigation/Toolbar';
import SideDrawer from '../../Navigation/SideDrawer';
import Sovljanski from '../../../assets/img/sovljanski.jpg';

import classes from '../hoc.module.scss';

const Layout = (props) => {
    const [sideDrawerMob, setSideDrawerMob] = useState('translateX(-100%)');
    const [showBackdrop, setShowBackdrop] = useState('');

    const sideDrawerOpenHandler = () => {
        setSideDrawerMob('translateX(0)');
        setShowBackdrop(classes.backdropIn);
    };

    const sideDrawerCloseHandler = () => {
        setSideDrawerMob('translateX(-100%)');
        setShowBackdrop(classes.backdropOut);
    };

    return (
        <div
            className={classes.Layout}
            style={{
                backgroundColor: props.backgroundColorLayout,
            }}
        >
            <Toolbar
                displayHamButton={props.displayHamButton}
                displayLoginBtn={props.displayLoginBtn}
                displayRegisterBtn={props.displayRegisterBtn}
                displayToolbarNavBtn={props.displayToolbarNavBtn}
                displayToolbarBookingBtn={props.displayToolbarBookingBtn}
                displaySelect={props.displaySelect}
                displayNotifLabel={props.displayNotifLabel}
                classNameLogin={props.classNameLogin}
                classNameRegister={props.classNameRegister}
                classNameToolbarNavBtn={props.classNameToolbarNavBtn}
                classNameToolbarBookingBtn={props.classNameToolbarBookingBtn}
                sideDrawerOpen={sideDrawerOpenHandler}
                classNameLogo={classes.Logo}
                selectData={props.selectData}
                sms={props.sms}
                license={props.license}
                classNameEmployeeSelect={props.classNameEmployeeSelect}
                setSelectedEmployee={props.setSelectedEmployee}
            />
            <SideDrawer
                displayMob={props.displaySideDrawerMob}
                displayPC={props.displaySideDrawerPC}
                displaySideDrawerBackdrop={'block'}
                transform={sideDrawerMob}
                sideDrawerCloseHandler={sideDrawerCloseHandler}
                showBackdrop={showBackdrop}
                colorCalIcon={props.colorCalIcon}
                colorClientsIcon={props.colorClientsIcon}
                colorServicesIcon={props.colorServicesIcon}
                colorProfileIcon={props.colorProfileIcon}
                classNameCal={props.classNameCal}
                classNameClients={props.classNameClients}
                classNameServices={props.classNameServices}
                classNameProfile={props.classNameProfile}
                src={Sovljanski}
                alt="Sovljanski"
                salonName="Friserski salon Sovljanski"
                logOut={props.logOut}
            />
            <main
                className={classes.Main}
                style={{
                    display: 'block',
                }}
            >
                {props.children}
            </main>
        </div>
    );
};
export default Layout;
