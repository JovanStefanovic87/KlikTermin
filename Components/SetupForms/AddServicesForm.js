//REFAKTORISANO
import { useState, useEffect, useRef } from 'react';
import {
    useDeviceDetect,
    inputChangedHandler,
    updateValidity,
    responseHandler,
    infoMessageHandler,
    getErrorMessage,
} from '../../helpers/universalFunctions';
import { saveServicesToManyEmployees } from '../../api/saveServicesToManyEmployees';
import initServicesForm from './initServicesForm';
import Input from '../UI/Forms/Input';
import Select from '../UI/Select';
import EmployeesPicker from './EmployeesPicker';

import WrappedButtonsMob from '../UI/WrappedButtonsMob';

import classes from './SetupForms.module.scss';

const AddServicesForm = (props) => {
    const { isMobile } = useDeviceDetect();
    const isComponentLoad = useRef(true);
    const [serviceData, setServiceData] = useState({});

    const duration = ['15', '30', '45', '60'];

    const durationList = () => {
        return duration.map((time, i) => (
            <option key={i} value={time}>
                {time}
            </option>
        ));
    };

    function resHandler(message) {
        responseHandler(
            props.setShowResponseModal,
            message,
            'red',
            !props.showResponseModal.triger,
            props.setIsLoading,
        );
    }

    function infoHandler(message) {
        infoMessageHandler(props.setShowInfoModal, message, !props.showInfoModal.triger, props.setIsLoading);
    }

    function inputChanged(e, inputIdentifier) {
        inputChangedHandler(e, inputIdentifier, props.servicesFormInput, props.setServicesFormInput);
    }

    const inputValidityHandler = (inputName, message) => {
        updateValidity(props.setServicesFormInput, props.servicesFormInput, inputName, '', false);
        resHandler(message);
    };

    const serviceProvidersPreview = (serviceProviders) => {
        const listItems = serviceProviders.map((serviceProvider) => {
            return (
                <option key={serviceProvider.id} value={serviceProvider.id}>
                    {serviceProvider.name}
                </option>
            );
        });
        return listItems;
    };

    const displayForm = () => {
        if (props.userGuideStatus === 'Employees') {
            props.setDisplayGreeting('none');
            props.setDisplayAddServicesForm('block');
        } else {
            props.setDisplayAddServicesForm('none');
        }
    };

    function cancelAddServicePcHandler() {
        props.setServiceId(null);
        props.setCheckedEmployees([]);
        props.setFormInput(initServicesForm);
        props.setDisplayAddServicesForm('none');
        props.setEditMode(false);
    }

    function cancelAddServiceMobHandler() {
        props.setDisplayAddServicesForm('none');
        isMobile ? {} : props.setServicesFormInput(initServicesForm);
        props.setCheckedEmployees([]);
    }

    function forward() {
        props.setDisplayAddServicesForm('none');
        props.setDisplayWorkingTimeForm('block');
    }

    const addServiceToManyHandler = () => {
        const api = saveServicesToManyEmployees(serviceData)
            .then(() => {
                props.getAllServicesHandler();
                props.resetForm();
                props.setCheckedEmployees([]);
                infoHandler('Uspešno sačuvano');
                props.setDisplayAddServicesForm(props.isSetupGuide ? 'block' : 'none');
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
        addServiceToManyHandler();
    }, [serviceData]);

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = [
            {
                Id: props.serviceId,
                Name: props.servicesFormInput.serviceName.value.trim(),
                Duration: parseInt(props.servicesFormInput.duration.value),
                Price:
                    typeof props.servicesFormInput.price.value === 'string'
                        ? parseFloat(props.servicesFormInput.price.value.trim())
                        : props.servicesFormInput.price.value,
                Employees: props.checkedEmployees,
                Description: props.servicesFormInput.description.value.trim(),
                Deleted: props.servicesFormInput.deleted,
            },
        ];

        if (!props.servicesFormInput.serviceName.value.trim()) {
            inputValidityHandler('serviceName', 'Morate uneti naziv usluge!');
        } else if (!props.servicesFormInput.duration.value) {
            inputValidityHandler('duration', 'Morate izabrati dužinu trajanja usluge!');
        } else if (props.checkedEmployees.length === 0) {
            inputValidityHandler('', 'Morate izabrati minimum jednog radnika!');
        } else {
            setServiceData(formData);
            props.setIsLoading(true);
        }
    };

    useEffect(() => {
        props.servicesData.filter((item) => {
            if (item.id === props.serviceId) {
                props.setCheckedEmployees(item.employees);
                return props.setServicesFormInput({
                    ...props.servicesFormInput,
                    id: item.id,
                    serviceName: {
                        value: item.name,
                        touched: false,
                        valid: true,
                    },
                    duration: {
                        value: item.duration,
                        touched: false,
                        valid: true,
                    },
                    price: {
                        value: item.price,
                        touched: false,
                        valid: true,
                    },
                    description: {
                        value: item.description,
                        touched: false,
                        valid: true,
                    },
                    serviceProviderId: {
                        value: null,
                        touched: false,
                        valid: true,
                    },
                    deleted: item.deleted,
                });
            }
        });
    }, [props.serviceId]);

    useEffect(() => {
        if (isComponentLoad.current) {
            isComponentLoad.current = false;
            return;
        }
        displayForm();
    }, []);

    const inputClassName = isMobile ? classes.InputTextMob : classes.InputText;

    return (
        <>
            <div
                style={{ display: props.displayAddServicesForm }}
                className={[classes.Form, classes.FormLayout, classes.FormBlackBg].join(' ')}
            >
                <h3>Unesite usluge</h3>
                <Select
                    name="serviceProviderId"
                    className={classes.SelectInputText}
                    value={props.servicesFormInput.serviceProviderId.value}
                    onChange={(e) => inputChanged(e, 'serviceProviderId')}
                >
                    <option value="" disabled selected hidden>
                        Izaberite salon
                    </option>
                    {serviceProvidersPreview(props.serviceProviderData)}
                </Select>
                <Input
                    type="text"
                    name="serviceName"
                    placeholder="Unesite naziv usluge"
                    className={inputClassName}
                    value={props.servicesFormInput.serviceName.value}
                    onChange={(e) => inputChanged(e, 'serviceName')}
                    invalid={!props.servicesFormInput.serviceName.valid}
                />
                <Input
                    type="text"
                    name="description"
                    placeholder="Unesite opis usluge"
                    className={inputClassName}
                    value={props.servicesFormInput.description.value}
                    onChange={(e) => inputChanged(e, 'description')}
                />
                <Select
                    displaySelect="block"
                    className={classes.SelectInputText}
                    value={props.servicesFormInput.duration.value}
                    name={'duration'}
                    onChange={(e) => inputChanged(e, 'duration')}
                >
                    <option value="trajanje usluge" disabled selected hidden>
                        trajanje usluge
                    </option>
                    {durationList()}
                </Select>
                <Input
                    type="number"
                    name="price"
                    placeholder="Unesite cenu usluge"
                    maxLength="10"
                    className={inputClassName}
                    value={props.servicesFormInput.price.value}
                    onChange={(e) => inputChanged(e, 'price')}
                />
                <EmployeesPicker
                    title="Radnici u izabranom salonu"
                    listOfEmployees={props.employeeData}
                    addForSelectedClassName={classes.PickerCheckBox}
                    editMode={props.editMode}
                    selectedServiceProvider={props.servicesFormInput.serviceProviderId.value}
                    checkedEmployees={props.checkedEmployees}
                    setCheckedEmployees={props.setCheckedEmployees}
                    emptyListMessage={'Izaberite salon'}
                    tag="services"
                    displayEmployeesPicker={props.displayEmployeesPicker}
                />
                <Input
                    type="button"
                    value={props.editMode ? 'Sačuvaj' : 'Dodaj'}
                    className={
                        isMobile
                            ? [classes.ChoiceButton, classes.AddMob].join(' ')
                            : [classes.ChoiceButton, classes.Add].join(' ')
                    }
                    display={isMobile ? 'none' : 'block'}
                    marginBottom="20px"
                    onClick={onSubmit}
                />
                <Input
                    type="button"
                    value="Odustani"
                    display={props.displayCancel}
                    color="red"
                    className={isMobile ? classes.ForwardMob : classes.Forward}
                    onClick={() => cancelAddServicePcHandler()}
                />
                {/* <Select
				displaySelect="block"
				className={isMobile ? classes.SelectServiceForEditMob : classes.SelectInputText}
				id={'myServices'}
				name={'myServices'}
				onChange={e => {
					inputChangedHandler(e, 'myServices', servicesFormInput, setServicesFormInput),
						setServiceId(e.target.value),
						setEditMode(true);
				}}>
				<option value="Lista usluga" disabled selected>
					Lista usluga
				</option>
				{allServicesPreview()}
			</Select> */}
                <Input
                    type="button"
                    value="Nastavi >>>"
                    display={props.displayForward}
                    className={isMobile ? classes.ForwardMob : classes.Forward}
                    onClick={() => forward()}
                />
            </div>
            <WrappedButtonsMob
                forward={() => forward()}
                stopEdit={() => cancelAddServiceMobHandler()}
                save={onSubmit}
                isMobile={isMobile && props.displayAddServicesForm === 'block' ? true : false}
                displayForward={props.displayForwardMob}
                displaySave="block"
                displayAdd="none"
                displayStopEdit={props.displayStopEditMob}
                validation={props.validation}
            />
        </>
    );
};

export default AddServicesForm;
