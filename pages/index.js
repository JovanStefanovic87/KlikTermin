import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import nextCookie from 'next-cookies';
import Link from 'next/link';
import Head from 'next/head';
import { useDeviceDetect } from '../helpers/universalFunctions';

import Layout from '../Components/hoc/Layout/Layout';
import NavItem from '../Components/Navigation/NavItem';
import NavItems from '../Components/Navigation/NavItems';
import Slider from '../Components/HomePage/Slider';
import Login from '../Components/Auth/Login/Login';
import RegServProv from '../Components/Auth/RegServProv/RegServProv';
import PassRecovery from '../Components/Auth/PassRecovery/PassRecovery';
import ClientVerification from '../Components/Auth/ClientVerification';
import ContactForm from '../Components/HomePage/forms/ContactForm';
import Footer from '../Components/HomePage/Footer';
import OurServices from '../Components/HomePage/OurServices/OurServices';
import AuthButton from '../Components/HomePage/AuthButton';
import ResponseModal from '../Components/UI/Modal/ResponseModal';
import InfoModal from '../Components/UI/Modal/InfoModal';
import Loader from '../Components/UI/Loader';

import classes from '../Components/Navigation/Navigation.module.scss';

const Index = () => {
    const { isMobile } = useDeviceDetect();
    const router = useRouter();
    const isPageLoad = useRef(true);
    const [regColor, setRegColor] = useState('orange');
    const [loginColor, setLoginColor] = useState('white');
    const [isLoading, setIsLoading] = useState(false);
    const [userStatus, setUserStatus] = useState('');
    const [displayTabContainer, setDisplayTabContainer] = useState('none');
    const [displayTabButtons, setDisplayTabButtons] = useState('none');
    const [displayLogin, setDisplayLogin] = useState('none');
    const [displayRegServProv, setDisplayRegServProv] = useState('none');
    const [displayClientVerify, setDisplayClientVerify] = useState('none');
    const [displayPassRecovery, setDisplayPassRecovery] = useState('none');
    /* const [loginInputId, setLoginInputId] = useState(null); */
    const [showInfoModal, setShowInfoModal] = useState({
        triger: false,
        message: null,
    });
    const [showResponseModal, setShowResponseModal] = useState({
        triger: false,
        message: null,
        border: '',
    });

    const regTabHandler = () => {
        setRegColor('orange');
        setLoginColor('white');
        setDisplayRegServProv('block');
        setDisplayLogin('none');
    };

    const loginTabHandler = () => {
        setRegColor('white');
        setLoginColor('orange');
        setDisplayRegServProv('none');
        setDisplayLogin('block');
    };

    function loginFormHandler() {
        setDisplayTabContainer('block');
        setDisplayTabButtons('block');
        setDisplayLogin('block');
        setDisplayRegServProv('none');
        setRegColor('white');
        setLoginColor('orange');
    }

    function regServProvFormHandler() {
        setDisplayTabContainer('block');
        setDisplayRegServProv('block');
        setDisplayLogin('none');
        setRegColor('orange');
        setLoginColor('white');
    }

    useEffect(() => {
        if (isPageLoad.current) {
            isPageLoad.current = false;
            return;
        }
        /* const loginInput = document.getElementById('login1stInput'); */
        /* setLoginInputId(loginInput); */
    }, []);

    /* const focusInputHandler = element => {
		element.focus();
		console.log(element);
	}; */

    const Navigation = (
        <NavItems display={isMobile ? 'none' : 'inherit'}>
            <p className={classes.logNotifPc} style={{ display: 'none' }}>
                Dobrodošli Jovan Stefanovic
            </p>
            <NavItem
                link="/"
                className={classes.IndexToolbarNavBtn}
                displayLoginBtn="block"
                marginLeft="10px"
                onClick={() => loginFormHandler()}>
                <a>Prijava</a>
            </NavItem>
            <NavItem
                link="/"
                className={classes.IndexToolbarNavBtn}
                displayRegBtn="block"
                marginLeft="85px"
                onClick={() => {
                    regServProvFormHandler();
                    /* focusInputHandler(loginInputId); */
                }}>
                <a>Registracija</a>
            </NavItem>
            <NavItem link="/" className={classes.IndexToolbarNavBtn} marginLeft="205px">
                <a>Usluge</a>
            </NavItem>
            <NavItem link="/" className={classes.IndexToolbarNavBtn} marginLeft="283px">
                <a>Kontakt</a>
            </NavItem>
            <Link href="/kalendar">
                <NavItem link="/kalendar" className={classes.IndexBookingButton} marginLeft="375px">
                    <a>Rezerviši termin</a>
                </NavItem>
            </Link>
        </NavItems>
    );

    const Authentification = (
        <>
            <InfoModal message={showInfoModal.message} showInfoModal={showInfoModal} borderColor="green" />
            <ResponseModal showResponseModal={showResponseModal} />
            <div
                className={isMobile ? classes.TabContainerMob : classes.TabContainer}
                style={{ position: 'fixed', display: displayTabContainer }}>
                <div className={classes.TabButtonContainer}>
                    <button
                        style={{ color: regColor, display: displayTabButtons }}
                        onClick={() => {
                            regTabHandler();
                        }}>
                        Registracija
                    </button>
                    <button
                        style={{
                            color: loginColor,
                            display: displayTabButtons,
                        }}
                        onClick={() => {
                            loginTabHandler();
                            /* focusInputHandler(loginInputId); */
                        }}>
                        Login
                    </button>
                </div>
                <Login
                    showInfoModal={showInfoModal}
                    setShowInfoModal={setShowInfoModal}
                    showResponseModal={showResponseModal}
                    setShowResponseModal={setShowResponseModal}
                    displayLogin={displayLogin}
                    setDisplayLogin={setDisplayLogin}
                    setDisplayPassRecovery={setDisplayPassRecovery}
                    setDisplayRegServProv={setDisplayRegServProv}
                    setIsLoading={setIsLoading}
                    setUserStatus={setUserStatus}
                    setDisplayTabContainer={setDisplayTabContainer}
                    inputId={'login1stInput'}
                />
                <RegServProv
                    showResponseModal={showResponseModal}
                    setShowResponseModal={setShowResponseModal}
                    displayRegServProv={displayRegServProv}
                    setDisplayRegServProv={setDisplayRegServProv}
                    setIsLoading={setIsLoading}
                    setDisplayTabContainer={setDisplayTabContainer}
                />
                <PassRecovery
                    showResponseModal={showResponseModal}
                    setShowResponseModal={setShowResponseModal}
                    displayPassRecovery={displayPassRecovery}
                    setDisplayPassRecovery={setDisplayPassRecovery}
                    setDisplayLogin={setDisplayLogin}
                    setDisplayTabButtons={setDisplayTabButtons}
                />
            </div>

            <ClientVerification
                displayClientVerify={displayClientVerify}
                setDisplayClientVerify={setDisplayClientVerify}
            />
        </>
    );

    useEffect(() => {
        if (isPageLoad.current) {
            isPageLoad.current = false;
            return;
        }
        if (
            (userStatus.guideStatus !== 'WorkingHours' && userStatus.userRole === 'Company') ||
            userStatus.userRole === 'ServiceProvider' ||
            userStatus.userRole === 'Employee'
        ) {
            router.push('/setupguide');
        } else if (userStatus.guideStatus === 'WorkingHours' && userStatus.userRole === 'Company') {
            router.push('/kalendar');
        } else if (userStatus.userRole === 'Client') {
            alert('preusmeriti klijenta na klijent kalendar stranicu');
        } else {
            router.push('/');
        }
    }, [userStatus]);

    return (
        <>
            <Head>
                <title>KlikTermin | Početna stranica</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Layout
                displayHamButton="none"
                displaySideDrawerMob="none"
                displaySideDrawerPC="none"
                displayNotifLabel="none"
                displaySelect="none"
                classNameCal={classes.sideDrawerButtonActive}
                classNameClients={classes.sideDrawerButton}
                classNameServices={classes.sideDrawerButton}
                classNameProfile={classes.sideDrawerButton}
                selectData={null}
                backgroundColorLayout="#303030">
                <Loader loading={isLoading} />
                {Authentification}
                {Navigation}
                <Slider />
                <OurServices />
                <hr style={{ marginTop: isMobile ? '10px' : '40px' }} />
                <ContactForm
                    showResponseModal={showResponseModal}
                    setShowResponseModal={setShowResponseModal}
                    showInfoModal={showInfoModal}
                    setShowInfoModal={setShowInfoModal}
                    setIsLoading={setIsLoading}
                />
                <AuthButton
                    onClickLogin={() => {
                        loginFormHandler();
                    }}
                    onClickReg={() => {
                        regServProvFormHandler();
                        setLoginColor('white');
                    }}
                    diplayBackdrop={
                        displayLogin === 'block' ? 'block' : displayRegServProv === 'block' ? 'block' : 'none'
                    }
                />
                {/* <button onClick={() => console.log(authenticate)}></button> */} {/* test za redux */}
                <Footer />
            </Layout>
        </>
    );
};

export async function getServerSideProps(ctx) {
    const token = await nextCookie(ctx);

    if (token) {
        return { props: { token: true } };
    } else {
        return { props: { token: false } };
    }
}

export default Index;
