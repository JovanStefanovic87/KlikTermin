import { useEffect, useState } from 'react';
import { fetchJson } from '../api/fetchJson';
import { auth } from '../helpers/auth';
import Head from 'next/head';
import Layout from '../Components/hoc/Layout/Layout';
import ClientCalendar from '../Components/Calendar/ClientCalendar';
import { getMondayForAPI } from '../helpers/universalFunctions';
import classes from '../Components/Navigation/Navigation.module.scss';
import { useRouter } from 'next/router';
import { parseJwt } from '../helpers/universalFunctions';

const CalendarPage = (props) => {
    const router = useRouter();
    const [selectedEmployee, setSelectedEmployee] = useState(props.employeeId);
    const [mondayDate, setMondayDate] = useState(props.mondayDate);
    const [clientFormBackdrop, setClientFormBackdrop] = useState('none');

    const clientFormBackdropShow = () => {
        setClientFormBackdrop('block');
    };

    const clientFormBackdropHide = () => {
        setClientFormBackdrop('none');
    };

    const refreshData = () => {
        router.replace(router.asPath);
    };

    useEffect(() => {
        console.log('serviceProviders', props.serviceProviders);
        console.log('employees', props.employees);
        console.log('services', props.services);
        console.log('userStatus', props.userStatus);
        console.log('workingHours', props.workingHours);
        console.log('appointments', props.appointments);
        console.log('mondayDate', props.mondayDate);

        if (mondayDate && selectedEmployee)
            router.replace(`klijent-kalendar?mondayDate=${mondayDate}&employeeId=${selectedEmployee}`);
    }, [mondayDate, selectedEmployee]);

    return (
        <>
            <Head>
                <title>KlikTermin | Kalendar</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Layout
                displayLoginBtn="none"
                displayRegisterBtn="none"
                displayToolbarNavBtn="none"
                displayToolbarBookingBtn="none"
                displayNotifLabel="block"
                colorCalIcon="#fc9815"
                classNameCal={classes.sideDrawerButtonActive}
                classNameClients={classes.sideDrawerButton}
                classNameServices={classes.sideDrawerButton}
                classNameProfile={classes.sideDrawerButton}
                classNameEmployeeSelect={classes.EmployeeSelect}
                selectData={props.employees}
                sms="10"
                license="5"
                setSelectedEmployee={setSelectedEmployee}
            >
                <ClientCalendar
                    displayBackdrop={clientFormBackdrop}
                    showBackdrop={clientFormBackdropShow}
                    hideBackdrop={clientFormBackdropHide}
                    employees={props.employees}
                    services={props.services}
                    selectedEmployee={selectedEmployee}
                    workingHours={props.workingHours}
                    appointments={props.appointments}
                    refreshData={refreshData}
                    employeeId={props.employeeId}
                    clientId={props.clientId}
                />
            </Layout>
        </>
    );
};

export async function getServerSideProps(ctx) {
    const { employeeId, mondayDate } = ctx.query;
    const token = auth(ctx);

    const parsedJWT = parseJwt(token);
    const clientId = parsedJWT?.userId;
    const mondayDateForAPI = mondayDate ?? getMondayForAPI();
    const lastAppointmentEmployeeIdUrl = `appointments/getLastAppointmentEmployeeId`;
    const lastAppointmentEmployeeId = await fetchJson(lastAppointmentEmployeeIdUrl, 'get', token).then(
        (res) => res.data,
    );
    const employeeIdForAPI = employeeId ?? lastAppointmentEmployeeId;

    const employeesUrl = `users/getAllEmployees?employeeId=${employeeIdForAPI}`;
    const resEmployees = await fetchJson(employeesUrl, 'get', token);
    const serviceProvidersUrl = `users/getAllServiceProviders?employeeId=${employeeIdForAPI}`;
    const resServiceProviders = await fetchJson(serviceProvidersUrl, 'get', token);
    const servicesUrl = `appointments/getAllServices?employeeId=${employeeIdForAPI}`;
    const resServices = await fetchJson(servicesUrl, 'get', token);
    const guideStatusUrl = `users/getCompanyGuideStatus`;
    const resGuideStatusUrl = await fetchJson(guideStatusUrl, 'get', token);
    const workingHoursUrl = `settings/getWorkingHours?dateOfMonday=${mondayDateForAPI}&employeeId=${employeeIdForAPI}`;
    const workingHours = await fetchJson(workingHoursUrl, 'get', token).then((res) => res.data);
    const appointmentUrl = `appointments/getAppointments?&dateOfMonday=${mondayDateForAPI}&employeeId=${employeeIdForAPI}`;
    const appointments = await fetchJson(appointmentUrl, 'get', token).then((res) => res.data);

    const serviceProviders =
        resServiceProviders.data &&
        resServiceProviders.data.map((name) => {
            return name;
        });

    const employees =
        resEmployees.data &&
        resEmployees.data.map((name) => {
            return name;
        });

    const services =
        resServices.data &&
        resServices.data.map((name) => {
            return name;
        });

    const userStatus = resGuideStatusUrl.data;

    return {
        props: {
            token: token,
            serviceProviders,
            employees,
            services,
            userStatus,
            workingHours,
            appointments,
            employeeId: employeeIdForAPI,
            mondayDate: mondayDateForAPI,
            clientId,
        },
    };
}

export default CalendarPage;
