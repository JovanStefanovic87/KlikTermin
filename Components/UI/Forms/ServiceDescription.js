//REFAKTORISANO
import { useEffect, useRef } from 'react';
import {
    useDeviceDetect,
    infoMessageHandler,
    getErrorMessage,
    responseHandler,
    inputChangedHandler,
} from '../../../helpers/universalFunctions';
import { saveServicesToManyEmployees } from '../../../api/saveServicesToManyEmployees';
import WrappedButtonsMob from '../WrappedButtonsMob';
import TextArea from './TextArea';
import Input from './Input';

import classes from '../UI.module.scss';

const ServiceDescription = (props) => {
    const { isMobile } = useDeviceDetect();
    const isComponentLoad = useRef(true);

    const saveDescription = () => {
        props.setIsLoading(false);
        const api = saveServicesToManyEmployees(props.serviceDescriptionData)
            .then(() => {
                props.getAllServicesHandler();
                infoMessageHandler(props.setShowInfoModal, 'Uspešno sačuvano', !props.showInfoModal.triger);
            })
            .catch((err) => {
                const errMessage = getErrorMessage(err.response);
                responseHandler(props.setShowResponseModal, errMessage, 'red', !props.showResponseModal.triger);
            });
        api;
    };

    useEffect(() => {
        if (isComponentLoad.current) {
            isComponentLoad.current = false;
            return;
        }

        /* addServiceToManyHandler(); */
        saveDescription();
    }, [props.serviceDescriptionData]);

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = [
            {
                Id: props.serviceId,
                Name: props.formInput.serviceName.value.trim(),
                Duration: parseInt(props.formInput.duration.value),
                Price:
                    typeof props.formInput.price.value === 'string'
                        ? parseFloat(props.formInput.price.value.trim())
                        : props.formInput.price.value,
                Employees: props.checkedEmployees,
                Description: props.formInput.description.value.trim(),
                Deleted: props.formInput.deleted,
            },
        ];
        props.setServiceDescriptionData(formData);
        props.setIsLoading(true);
    };

    function stopEditHandler() {
        props.setDisplayDescription('none');
        props.setDescriptionEdit(false);
        props.resetForm();
    }

    return (
        <div className={classes.AddFormContainer} style={{ display: props.displayDescription }}>
            <div className={isMobile ? classes.DescriptionContainerMob : classes.DescriptionContainer}>
                <h3>Dodatne informacije</h3>
                <TextArea
                    value={props.formInput.description.value}
                    className={classes.DescriptionArea}
                    minRows="5"
                    onChange={(e) => inputChangedHandler(e, 'description', props.formInput, props.setFormInput)}
                />
                <Input type="button" value="sačavaj" display={isMobile ? 'none' : 'block'} />
                <WrappedButtonsMob
                    save={onSubmit}
                    isMobile={props.displayWrappedButtonsMob(props.displayDescription)}
                    displayForward="none"
                    displaySave="block"
                    displayAdd="none"
                    displayStopEdit="block"
                    stopEdit={() => stopEditHandler()}
                    validation={true}
                />
            </div>
        </div>
    );
};

export default ServiceDescription;
