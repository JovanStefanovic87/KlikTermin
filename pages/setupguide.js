import { useState } from 'react';
import { auth } from '../helpers/auth';
import { fetchJson } from '../api/fetchJson';
import { useDeviceDetect, responseHandler, getErrorMessage, getResponseData } from '../helpers/universalFunctions';
import Head from 'next/head';
import Layout from '../Components/hoc/Layout/Layout';
import ResponseModal from '../Components/UI/Modal/ResponseModal';
import InfoModal from '../Components/UI/Modal/InfoModal';
import Loader from '../Components/UI/Loader';
import GreetingForm from '../Components/SetupForms/GreetingForm';
import ServiceProviderQuestionForm from '../Components/SetupForms/ServiceProviderQuestionForm';
import EmployeesQuestionForm from '../Components/SetupForms/EmployeesQuestionForm';
import AddServiceProvidersForm from '../Components/SetupForms/AddServiceProvidersForm';
import AddEmployeeForm from '../Components/SetupForms/addEmployeeForm';
import AddServicesForm from '../Components/SetupForms/AddServicesForm';
import WorkingTimeForm from '../Components/SetupForms/WorkingTimeForm';
import { getAllServices } from '../api/getAllServices';
import initServiceProviderForm from '../Components/SetupForms/initServiceProviderForm';
import initEmployeeForm from '../Components/SetupForms/initEmployeeForm';
import initServicesForm from '../Components/SetupForms/initServicesForm';
import classes from '../Components/SetupForms/SetupForms.module.scss';

const Setupguide = (props) => {
    const { isMobile } = useDeviceDetect();
    const [serviceProviderData, setServiceProviderData] = useState(props.serviceProviders);
    const [employeeData, setEmployeeData] = useState(props.employees);
    const isAnyServiceProvider = props.serviceProviders.length !== 0 ? true : false;
    const [singleEmployee, setSingleEmployee] = useState(false);
    const [servicesData, setServicesData] = useState(props.services);
    const [isLoading, setIsLoading] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState({
        triger: false,
        message: null,
    });
    const [showResponseModal, setShowResponseModal] = useState({
        triger: false,
        message: null,
        border: '',
    });
    const [displayGreeting, setDisplayGreeting] = useState('block');
    const [displayServiceProviderQuestionForm, setDisplayServiceProviderQuestionForm] = useState('none');
    const [displayEmployeeQuestionForm, setDisplayEmployeeQuestionForm] = useState('none');
    const [displayAddServiceProvidersForm, setDisplayAddServiceProvidersForm] = useState('none');
    const [displayAddEmployeeForm, setDisplayAddEmployeeForm] = useState('none');
    const [displayAddServicesForm, setDisplayAddServicesForm] = useState('none');
    const [displayWorkingTimeForm, setDisplayWorkingTimeForm] = useState('none');
    /* const serviceProviderDatails = serviceProviderData.map(data => {
		return {
			id: data.id,
			name: data.name,
		};
	}); */
    /* const userGuideStatus = props.userStatus; */
    const userGuideStatus = 'employees';
    const [editMode, setEditMode] = useState(false);
    const [checkedEmployees, setCheckedEmployees] = useState([]);
    const [servProvFormInput, setServProvFormInput] = useState(initServiceProviderForm);
    const [serviceProviderInfo, setServiceProviderInfo] = useState([]);
    const [serviceProvidersList, setServiceProvidersList] = useState([]);
    const [serviceProviderId, setServiceProviderId] = useState(null);
    const [servicesFormInput, setServicesFormInput] = useState(initServicesForm);
    const [emplyeesFormInput, setEmplyeesFormInput] = useState(initEmployeeForm);
    const [employeeId, setEmployeeId] = useState(null);
    const [workingTimeFormInput, setWorkingTimeFormInput] = useState([]);
    const [workingHoursData, setWorkingHoursData] = useState({});

    function resHandler(message) {
        responseHandler(setShowResponseModal, message, 'red', !showResponseModal.triger, setIsLoading);
    }

    /* const completnessMessageHandler = message => {
		setShowInfoModal(modalAnimationIn);
		setIsLoading(false);
		setCompletnessMessage(message);
	}; */

    /* useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		const autoModalDisplay = () => {
			setShowInfoModal(modalAnimationOut);
		};

		const timer = setTimeout(() => {
			autoModalDisplay();
		}, 2000);

		return () => clearTimeout(timer);
	}, [showInfoModal]); */

    const getAllServicesHandler = async () => {
        const api = await getAllServices()
            .then((res) => {
                const getServicesData = getResponseData(res);
                setServicesData(getServicesData);
            })
            .catch((err) => {
                const errMessage = getErrorMessage(err.response);
                resHandler(errMessage);
            });
        return api;
    };

    function addEmployeeFormReset() {
        setEmployeeId(null);
        setEmplyeesFormInput(initEmployeeForm);
        setEditMode(false);
    }

    return (
        <>
            <Head>
                <title>KlikTermin | Podešavanja</title>
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
                backgroundColorLayout="#303030"
            >
                <Loader loading={isLoading} />
                <InfoModal message={showInfoModal.message} showInfoModal={showInfoModal} borderColor="green" />
                <ResponseModal showResponseModal={showResponseModal} />
                <div className={[classes.Form, classes.FormLayout, classes.FormBlackBg].join(' ')}>
                    <h2 className={isMobile ? classes.FormTitleMob : classes.FormTitle}>VODIČ ZA PODEŠAVANJE</h2>
                    <GreetingForm
                        displayGreeting={displayGreeting}
                        setDisplayGreeting={setDisplayGreeting}
                        setDisplayServiceProviderQuestionForm={setDisplayServiceProviderQuestionForm}
                        setDisplayEmployeeQuestionForm={setDisplayEmployeeQuestionForm}
                        isAnyServiceProvider={isAnyServiceProvider}
                        userGuideStatus={userGuideStatus.guideStatus}
                    />
                    <ServiceProviderQuestionForm
                        setShowResponseModal={setShowResponseModal}
                        showResponseModal={showResponseModal}
                        displayServiceProviderQuestionForm={displayServiceProviderQuestionForm}
                        setDisplayServiceProviderQuestionForm={setDisplayServiceProviderQuestionForm}
                        setDisplayEmployeeQuestionForm={setDisplayEmployeeQuestionForm}
                        setDisplayAddServiceProvidersForm={setDisplayAddServiceProvidersForm}
                        setServiceProviderData={setServiceProviderData}
                        setIsLoading={setIsLoading}
                    />
                    <EmployeesQuestionForm
                        setShowResponseModal={setShowResponseModal}
                        showResponseModal={showResponseModal}
                        setDisplayEmployeeQuestionForm={setDisplayEmployeeQuestionForm}
                        displayEmployeeQuestionForm={displayEmployeeQuestionForm}
                        setDisplayAddEmployeeForm={setDisplayAddEmployeeForm}
                        setDisplayAddServicesForm={setDisplayAddServicesForm}
                        singleEmployee={singleEmployee}
                        setSingleEmployee={setSingleEmployee}
                        userGuideStatus={userGuideStatus.guideStatus}
                        setDisplayGreeting={setDisplayGreeting}
                        setIsLoading={setIsLoading}
                    />
                    <AddServiceProvidersForm
                        showInfoModal={showInfoModal}
                        setShowInfoModal={setShowInfoModal}
                        showResponseModal={showResponseModal}
                        setShowResponseModal={setShowResponseModal}
                        displayAddServiceProvidersForm={displayAddServiceProvidersForm}
                        setDisplayAddServiceProvidersForm={setDisplayAddServiceProvidersForm}
                        setDisplayAddEmployeeForm={setDisplayAddEmployeeForm}
                        servProvFormInput={servProvFormInput}
                        setServProvFormInput={setServProvFormInput}
                        serviceProviderData={serviceProviderData}
                        setServiceProviderData={setServiceProviderData}
                        serviceProviderInfo={serviceProviderInfo}
                        setServiceProviderInfo={setServiceProviderInfo}
                        serviceProvidersList={serviceProvidersList}
                        setServiceProvidersList={setServiceProvidersList}
                        serviceProviderId={serviceProviderId}
                        setServiceProviderId={setServiceProviderId}
                        editMode={editMode}
                        setEditMode={setEditMode}
                        setIsLoading={setIsLoading}
                        displayStopEdit="none"
                        isSetupGuide={true}
                        /* displayStopEditMob="none" */
                        /* validation={true} */
                    />
                    <AddEmployeeForm
                        showInfoModal={showInfoModal}
                        setShowInfoModal={setShowInfoModal}
                        showResponseModal={showResponseModal}
                        setShowResponseModal={setShowResponseModal}
                        displayAddEmployeeForm={displayAddEmployeeForm}
                        setDisplayAddEmployeeForm={setDisplayAddEmployeeForm}
                        setDisplayAddServicesForm={setDisplayAddServicesForm}
                        serviceProviderData={serviceProviderData}
                        emplyeesFormInput={emplyeesFormInput}
                        setEmplyeesFormInput={setEmplyeesFormInput}
                        employeeData={employeeData}
                        setEmployeeData={setEmployeeData}
                        employeeId={employeeId}
                        setEmployeeId={setEmployeeId}
                        editMode={editMode}
                        setEditMode={setEditMode}
                        displayForward={isMobile ? 'none' : 'block-block'}
                        displayForwardMob={isMobile ? 'block' : 'none'}
                        resetForm={() => addEmployeeFormReset()}
                        setIsLoading={setIsLoading}
                        displayStopEdit={editMode && !isMobile ? 'inline-block' : 'none'}
                        displayStopEditMob={editMode ? 'inline-block' : 'none'}
                        isSetupGuide={true}
                        /* validation={true} */
                    />
                    <AddServicesForm
                        showInfoModal={showInfoModal}
                        setShowInfoModal={setShowInfoModal}
                        showResponseModal={showResponseModal}
                        setShowResponseModal={setShowResponseModal}
                        displayAddServicesForm={displayAddServicesForm}
                        servicesData={servicesData}
                        setDisplayAddServicesForm={setDisplayAddServicesForm}
                        setDisplayWorkingTimeForm={setDisplayWorkingTimeForm}
                        serviceProviders={props.serviceProviders}
                        employeeData={employeeData}
                        listOfEmployees={employeeData}
                        checkedEmployees={checkedEmployees}
                        setCheckedEmployees={setCheckedEmployees}
                        servicesFormInput={servicesFormInput}
                        setServicesFormInput={setServicesFormInput}
                        serviceProviderData={serviceProviderData}
                        setIsLoading={setIsLoading}
                        editMode={editMode}
                        setEditMode={setEditMode}
                        resetForm={() => setServicesFormInput(initServicesForm)}
                        userGuideStatus={userGuideStatus.guideStatus}
                        setDisplayGreeting={setDisplayGreeting}
                        displayEmployeesPicker="block"
                        displayForward={isMobile ? 'none' : 'block-block'}
                        displayForwardMob={isMobile ? 'block' : 'none'}
                        displayStopEdit="none"
                        displayStopEditMob="none"
                        validation={true}
                        isSetupGuide={true}
                        displayCancel="none"
                        getAllServicesHandler={getAllServicesHandler}
                    />
                    <WorkingTimeForm
                        showInfoModal={showInfoModal}
                        setShowInfoModal={setShowInfoModal}
                        showResponseModal={showResponseModal}
                        setShowResponseModal={setShowResponseModal}
                        displayWorkingTimeForm={displayWorkingTimeForm}
                        setDisplayWorkingTimeForm={setDisplayWorkingTimeForm}
                        listOfEmployees={employeeData}
                        serviceProviderData={serviceProviderData}
                        employeeId={employeeId}
                        setEmployeeId={setEmployeeId}
                        setServiceProviderId={setServiceProviderId}
                        serviceProviderId={serviceProviderId}
                        workingTimeFormInput={workingTimeFormInput}
                        setWorkingTimeFormInput={setWorkingTimeFormInput}
                        workingHoursData={workingHoursData}
                        setWorkingHoursData={setWorkingHoursData}
                        setIsLoading={setIsLoading}
                        userGuideStatus={userGuideStatus.guideStatus}
                        setDisplayGreeting={setDisplayGreeting}
                        /* modalAnimationIn={modalAnimationIn} */
                        /* completnessMessageHandler={completnessMessageHandler} */
                        /* completnessMessage={completnessMessage} */
                        displayStopEdit="none"
                        validation={employeeId}
                        isSetupGuide={true}
                    />
                </div>
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

    const userStatus = resGuideStatusUrl.data;

    return {
        props: {
            token,
            serviceProviders,
            employees,
            services,
            userStatus,
        },
    };
}

export default Setupguide;
