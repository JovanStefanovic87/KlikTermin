//REFAKTORISANO
import { useEffect, useRef } from 'react';
import { responseHandler } from '../../helpers/universalFunctions';
import { saveEmployees } from '../../api/saveEmployees';

import QuestionForm from './QuestionForm/QuestionForm';

const EmployeeQuestionForm = (props) => {
    const isComponentLoad = useRef(true);

    function resHandler(message) {
        responseHandler(
            props.setShowResponseModal,
            message,
            'red',
            !props.showResponseModal.triger,
            props.setIsLoading,
        );
    }

    const singleEmployeeHandler = (e) => {
        e.preventDefault();
        props.setSingleEmployee(true);
        props.setDisplayAddServicesForm('block');
        props.setIsLoading(true);
    };

    function onDecline() {
        props.setDisplayEmployeeQuestionForm('none');
        props.setDisplayAddEmployeeForm('block');
    }

    const displayForm = () => {
        if (props.userGuideStatus === 'ServiceProviders') {
            props.setDisplayGreeting('none');
            props.setDisplayEmployeeQuestionForm('block');
        } else {
            props.setDisplayEmployeeQuestionForm('none');
        }
    };

    const addNewEmployeeHandler = () => {
        const api = saveEmployees([])
            .then(() => {
                props.setIsLoading(false);
                props.setDisplayEmployeeQuestionForm('none');
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
        addNewEmployeeHandler();
    }, [props.singleEmployee]);

    useEffect(() => {
        if (isComponentLoad.current) {
            isComponentLoad.current = false;
            return;
        }
        displayForm();
    }, []);

    return (
        <QuestionForm
            title="Da li ste Vi jedini zaposleni?"
            displayQuestionForm={props.displayEmployeeQuestionForm}
            onSubmit={(e) => singleEmployeeHandler(e)}
            onDecline={() => onDecline()}
        />
    );
};

export default EmployeeQuestionForm;
