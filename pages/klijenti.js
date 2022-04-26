//Refaktorisano
import { useState } from 'react';
import { auth } from '../helpers/auth';
import { fetchJson } from '../api/fetchJson';
import {
    useDeviceDetect,
    responseHandler,
    infoMessageHandler,
    getErrorMessage,
    getResponseData,
} from '../helpers/universalFunctions';
import { banClient } from '../api/banClient';
import { getClients } from '../api/getClients';
import initClientForm from '../Components/Clients/initClientForm';
import ServiceProvidersEmployees from '../Components/DataFromBE/Clients';
import Head from 'next/head';
import Layout from '../Components/hoc/Layout/Layout';
import ResponseModal from '../Components/UI/Modal/ResponseModal';
import ConfirmModal from '../Components/UI/Modal/ConfirmModal';
import InfoModal from '../Components/UI/Modal/InfoModal';
import ClientsList from '../Components/Clients/ClientsList';
import AddClientForm from '../Components/Clients/AddClientForm';
import InviteClient from '../Components/AddToList/InviteClient';
import AddClientButton from '../Components/UI/AddClientButton';
import WrappedTools from '../Components/UI/WrappedTools';
import ClientDescription from '../Components/UI/Forms/ClientDescription';
import Loader from '../Components/UI/Loader';

import classes from '../Components/Navigation/Navigation.module.scss';

const Clients = (props) => {
    const { isMobile } = useDeviceDetect();
    const [isLoading, setIsLoading] = useState(false);
    const [formInput, setFormInput] = useState(initClientForm);
    const [userData, setUserData] = useState({});
    const [clientsData, setClientData] = useState(props.clients);
    const [clientId, setClientId] = useState(null);
    const [descriptionEdit, setDescriptionEdit] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [displayInviteClient, setDisplayInviteClient] = useState('none');
    const [showInviteClient, setShowInviteClient] = useState('');
    const [displayAddClientForm, setDisplayAddClientForm] = useState('none');
    const [displayWrappedTools, setDisplayWrappedTools] = useState('none');
    const [displayDescription, setDisplayDescription] = useState('none');
    const [showInfoModal, setShowInfoModal] = useState({
        triger: false,
        message: null,
    });
    const [showConfirmModal, setShowConfirmModal] = useState({
        message: null,
        triger: false,
    });
    const [showResponseModal, setShowResponseModal] = useState({
        triger: false,
        message: null,
        border: '',
    });

    function resHandler(message) {
        responseHandler(setShowResponseModal, message, 'red', !showResponseModal.triger, setIsLoading);
    }

    function infoHandler(message) {
        infoMessageHandler(setShowInfoModal, message, !showInfoModal.triger, setIsLoading);
    }

    const displayWrappedButtonsMob = (condition) => {
        if (isMobile && condition === 'block') {
            return true;
        } else return false;
    };

    const resetForm = () => {
        if (descriptionEdit) {
            return;
        } else {
            setClientId(null);
            setEditMode(false);
        }
    };

    const getClientsHandler = async (deleted) => {
        const api = await getClients(deleted)
            .then((res) => {
                const getClientsData = getResponseData(res);
                setClientData(getClientsData);
            })
            .catch((err) => {
                const errMessage = getErrorMessage(err.response);
                resHandler(errMessage);
            });
        return api;
    };

    const banClientHandler = () => {
        const api = banClient(clientId)
            .then(() => {
                getClientsHandler(false);
                resetForm();
                infoHandler('Klijent uspešno uklonjen sa liste!');
            })
            .catch((err) => {
                const errMessage = getErrorMessage(err.response);
                resHandler(errMessage);
            });
        api;
    };

    function confirmModalSubmitHandler() {
        banClientHandler(clientId);
        setDisplayWrappedTools('none');
        isMobile ? setDisplayWrappedTools('none') : {};
    }
    function newClientHandler() {
        setDisplayAddClientForm('block');
        setFormInput(initClientForm);
    }
    function editClientHandler() {
        setDisplayAddClientForm('block');
        setEditMode(true);
    }
    function clientInvitationHandler() {
        setShowInviteClient(classes.slideInLeft);
        setDisplayInviteClient('block');
    }

    return (
        <>
            <Head>
                <title>KlikTermin | Lista klienata</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Layout
                displayLoginBtn="none"
                displayRegisterBtn="none"
                displayToolbarNavBtn="none"
                displayToolbarBookingBtn="none"
                displaySelect="none"
                displayNotifLabel="block"
                colorClientsIcon="#fc9815"
                classNameCal={classes.sideDrawerButtonActive}
                classNameClients={classes.sideDrawerButton}
                classNameServices={classes.sideDrawerButton}
                classNameProfile={classes.sideDrawerButton}
                classNameEmployeeSelect={classes.EmployeeSelect}
                selectData={ServiceProvidersEmployees}
                sms="10"
                license="5"
            >
                <Loader loading={isLoading} />
                <InfoModal showInfoModal={showInfoModal} borderColor="green" />
                <ResponseModal showResponseModal={showResponseModal} />
                <ConfirmModal
                    showConfirmModal={showConfirmModal}
                    submitValue="Da"
                    itemId={setClientId}
                    onSubmit={() => confirmModalSubmitHandler()}
                />
                <WrappedTools
                    displayWrappedTools={displayWrappedTools}
                    setDisplayWrappedTools={setDisplayWrappedTools}
                    setDisplayDescription={setDisplayDescription}
                    setDescriptionEdit={setDescriptionEdit}
                    setShowConfirmModal={setShowConfirmModal}
                    triger={showConfirmModal.triger}
                    setFormInput={setFormInput}
                    setEditMode={setEditMode}
                    isEmployeesArray={false}
                    displayWrappedToolsChkBox="none"
                    setDataId={setClientId}
                    className={classes.WrappedToolsContainer}
                    initForm={initClientForm}
                    onClickEdit={() => editClientHandler()}
                />
                <ClientDescription
                    displayDescription={displayDescription}
                    setDisplayDescription={setDisplayDescription}
                    displayWrappedButtonsMob={displayWrappedButtonsMob}
                    formInput={formInput}
                    setFormInput={setFormInput}
                    setClientData={setClientData}
                    setUserData={setUserData}
                    clientId={clientId}
                    setDescriptionEdit={setDescriptionEdit}
                    resetForm={resetForm}
                    setIsLoading={setIsLoading}
                />
                <AddClientForm
                    setShowResponseModal={setShowResponseModal}
                    showResponseModal={showResponseModal}
                    showInfoModal={showInfoModal}
                    setShowInfoModal={setShowInfoModal}
                    getClientsHandler={getClientsHandler}
                    formInput={formInput}
                    setFormInput={setFormInput}
                    userData={userData}
                    setUserData={setUserData}
                    initClientForm={initClientForm}
                    clientsData={clientsData}
                    setClientData={setClientData}
                    clientId={clientId}
                    setClientId={setClientId}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    displayAddClientForm={displayAddClientForm}
                    setDisplayAddClientForm={setDisplayAddClientForm}
                    setDisplayDescription={setDisplayDescription}
                    displayWrappedButtonsMob={displayWrappedButtonsMob}
                    resetForm={resetForm}
                    setIsLoading={setIsLoading}
                />
                <InviteClient
                    display={displayInviteClient}
                    animation={showInviteClient}
                    setShowInviteClient={setShowInviteClient}
                />
                <ClientsList
                    setShowConfirmModal={setShowConfirmModal}
                    showConfirmModal={showConfirmModal}
                    setDisplayWrappedTools={setDisplayWrappedTools}
                    setDisplayAddClientForm={setDisplayAddClientForm}
                    setDisplayDescription={setDisplayDescription}
                    setDescriptionEdit={setDescriptionEdit}
                    clientsData={clientsData}
                    setClientId={setClientId}
                    setEditMode={setEditMode}
                    newClientHandler={newClientHandler}
                    setIsLoading={setIsLoading}
                />
                <AddClientButton onClick={() => clientInvitationHandler()} />
            </Layout>
        </>
    );
};

export async function getServerSideProps(ctx) {
    const token = await auth(ctx);
    const serviceProvidersUrl = `users/getAllServiceProviders`;
    const resServiceProviders = await fetchJson(serviceProvidersUrl, 'get', token);
    const employeesUrl = `users/getAllEmployees`;
    const resEmployees = await fetchJson(employeesUrl, 'get', token);
    const servicesUrl = `appointments/getAllServices`;
    const resServices = await fetchJson(servicesUrl, 'get', token);
    const clientsUrl = `users/getClients?deleted=${false}`;
    const resClients = await fetchJson(clientsUrl, 'get', token);
    const guideStatusUrl = `users/getCompanyGuideStatus`;
    const resGuideStatusUrl = await fetchJson(guideStatusUrl, 'get', token);

    const serviceProviders = resServiceProviders.data.map((name) => {
        return name;
    });

    const employees = resEmployees.data.map((name) => {
        return name;
    });

    const services = resServices.data.map((name) => {
        return name;
    });

    const clients = resClients.data.map((name) => {
        return name;
    });

    const userStatus = resGuideStatusUrl.data;

    return {
        props: {
            token,
            serviceProviders,
            employees,
            services,
            clients,
            userStatus,
        },
    };
}

export default Clients;
