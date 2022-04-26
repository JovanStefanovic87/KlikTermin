import { useState } from 'react';
import { auth } from '../helpers/auth';
import { fetchJson } from '../api/fetchJson';
import Head from 'next/head';
import ServiceProvidersEmployees from '../Components/DataFromBE/Clients';
import Layout from '../Components/hoc/Layout/Layout';
import Profile from '../Components/Profile/Profile';
import InfoModal from '../Components/UI/Modal/InfoModal';
import ResponseModal from '../Components/UI/Modal/ResponseModal';
import PassRecovery from '../Components/Auth/PassRecovery/PassRecovery';
import Loader from '../Components/UI/Loader';

import classes from '../Components/Navigation/Navigation.module.scss';

const Profil = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const profileData = props.profileData;
    const [displayPassRecovery, setDisplayPassRecovery] = useState('none');
    const [showInfoModal, setShowInfoModal] = useState({
        triger: false,
        message: null,
    });
    const [showResponseModal, setShowResponseModal] = useState({
        triger: false,
        message: null,
        border: '',
    });

    return (
        <>
            <Head>
                <title>KlikTermin | Profil</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Layout
                displayLoginBtn="none"
                displayRegisterBtn="none"
                displayToolbarNavBtn="none"
                displayToolbarBookingBtn="none"
                displaySelect="none"
                displayNotifLabel="block"
                colorProfileIcon="#fc9815"
                classNameCal={classes.sideDrawerButtonActive}
                classNameClients={classes.sideDrawerButton}
                classNameServices={classes.sideDrawerButton}
                classNameProfile={classes.sideDrawerButton}
                classNameEmployeeSelect={classes.EmployeeSelect}
                selectData={ServiceProvidersEmployees}
                sms="10"
                license="5"
            />
            <Loader loading={isLoading} />
            <InfoModal message={showInfoModal.message} showInfoModal={showInfoModal} borderColor="green" />
            <ResponseModal showResponseModal={showResponseModal} />
            <PassRecovery
                displayPassRecovery={displayPassRecovery}
                setDisplayPassRecovery={setDisplayPassRecovery}
                setShowResponseModal={setShowResponseModal}
            />
            <Profile
                showResponseModal
                setShowResponseModal={setShowResponseModal}
                showInfoModal={showInfoModal}
                setShowInfoModal={setShowInfoModal}
                responseTriger={setShowResponseModal.triger}
                profileData={profileData}
                setIsLoading={setIsLoading}
            />
        </>
    );
};

export async function getServerSideProps(ctx) {
    const token = await auth(ctx);
    const guideStatusUrl = `users/getCompanyGuideStatus`;
    const resGuideStatusUrl = await fetchJson(guideStatusUrl, 'get', token);
    const getEmployeeProfileUrl = `users/getEmployeeProfile`;
    const getEmployeeProfile = await fetchJson(getEmployeeProfileUrl, 'get', token);

    /* const profileData = getEmployeeProfile.data.map(data => {
		return data;
	}); */

    const profileData = getEmployeeProfile.data;

    const userStatus = resGuideStatusUrl.data;

    return {
        props: {
            token,
            userStatus,
            profileData,
        },
    };
}

export default Profil;
