//REFAKTORISANO
import { useState, useEffect, useRef } from 'react';
import { responseHandler } from '../../helpers/universalFunctions';
import { saveServiceProviders } from '../../api/saveServiceProviders';
import { getAllServiceProviders } from '../../api/getAllServiceProviders';

import QuestionForm from './QuestionForm/QuestionForm';

const ServiceProviderQuestionForm = (props) => {
    const isComponentLoad = useRef(true);
    const [singleServiceProvider, setSingleServiceProvider] = useState(false);

    function resHandler(message) {
        responseHandler(
            props.setShowResponseModal,
            message,
            'red',
            !props.showResponseModal.triger,
            props.setIsLoading,
        );
    }

    const singleCompanyHandler = (e) => {
        e.preventDefault();
        setSingleServiceProvider(true);
        props.setIsLoading(true);
    };

    const getAllServiceProvidersHandler = async () => {
        const api = await getAllServiceProviders()
            .then((response) => {
                const getServiceProviderName = response.data.map((serviceProvider) => {
                    return serviceProvider;
                });
                props.setServiceProviderData(getServiceProviderName);
            })
            .catch((err) => {
                const errMessage = getErrorMessage(err.response);
                resHandler(errMessage);
            });
        api;
    };

    const addNewServiceProviderHandler = () => {
        const api = saveServiceProviders([])
            .then(() => {
                props.setIsLoading(false);
                props.setDisplayServiceProviderQuestionForm('none');
                props.setDisplayEmployeeQuestionForm('block');
                getAllServiceProvidersHandler();
            })
            .catch((err) => {
                const errMessage = getErrorMessage(err.response);
                resHandler(errMessage);
            });
        api;
    };

    useEffect(() => {
        if (isComponentLoad.current) {
            isComponentLoad.current = false;
            return;
        }
        addNewServiceProviderHandler();
    }, [singleServiceProvider]);

    function onSubmit() {
        props.setDisplayServiceProviderQuestionForm('none');
        props.setDisplayAddServiceProvidersForm('block');
    }

    return (
        <QuestionForm
            title="Da li imate više salona?"
            displayQuestionForm={props.displayServiceProviderQuestionForm}
            onSubmit={() => onSubmit()}
            onDecline={(e) => singleCompanyHandler(e)}
        />
    );
};

export default ServiceProviderQuestionForm;
