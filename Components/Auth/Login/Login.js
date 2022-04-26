//REFAKTORIANO
import { useState, useRef, useEffect } from 'react';
import { userLogin } from '../../../api/userLogin';
import {
    useDeviceDetect,
    inputChangedHandler,
    updateValidity,
    responseHandler,
    infoMessageHandler,
    getErrorMessage,
} from '../../../helpers/universalFunctions';
import { getCompanyGuideStatus } from '../../../api/getCompanyGuideStatus';
import initState from './initState';

import Input from '../../UI/Forms/Input';

import classes from '../../UI/UI.module.scss';

const Login = (props) => {
    const { isMobile } = useDeviceDetect();
    const isComponentLoad = useRef(true);
    const [loginUser, setLoginUser] = useState([]);
    const [formInput, setFormInput] = useState(initState);

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
        inputChangedHandler(e, inputIdentifier, formInput, setFormInput);
    }

    const inputValidityHandler = (inputName, message) => {
        updateValidity(setFormInput, formInput, inputName, '', false);
        resHandler(message);
    };

    function closeForm() {
        props.setDisplayLogin('none');
        props.setDisplayTabContainer('none');
        setFormInput(initState);
        1;
    }

    function passRecoveryFormHandler() {
        props.setDisplayLogin('none');
        props.setDisplayPassRecovery('block');
        setFormInput(initState);
    }

    const getGuideStatus = async () => {
        const api = await getCompanyGuideStatus()
            .then((response) => {
                const getGuideStatusData = response.data;
                props.setUserStatus(getGuideStatusData);
            })
            .catch((err) => {
                const errMessage = getErrorMessage(err.response);
                resHandler(errMessage);
            });
        return api;
    };

    const userData = {
        userName: loginUser.userName,
        password: loginUser.password,
    };

    const loginHandler = () => {
        const api = userLogin(userData)
            .then(() => {
                infoHandler('Uspešno ste se prijavili!');
                getGuideStatus();
                setFormInput(initState);
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
        loginHandler();
    }, [loginUser]);

    const buttonClassName = (mob, pc) => {
        return isMobile ? mob : [pc, classes.Block].join(' ');
    };
    const buttonGroup = (
        <>
            <Input
                type="submit"
                name="submit"
                value="PRIJAVI SE"
                placeholder="Uneti lozinku"
                margin={isMobile ? '30px auto 5px auto' : null}
                className={buttonClassName(classes.SubmitButtonMob, classes.SubmitButton)}
            />
            <Input
                type="button"
                name="passRecovery"
                value="ZABORAVLJENA LOZINKA"
                placeholder="Uneti lozinku"
                className={buttonClassName(classes.FormButtonMob, classes.FormButton)}
                onClick={() => passRecoveryFormHandler()}
            />
            <Input
                type="button"
                name="formClose"
                value="ODUSTANI"
                placeholder="Uneti lozinku"
                className={buttonClassName(classes.FormButtonMob, classes.FormButton)}
                color="orangered"
                display={props.clientAuth === 1 ? 'none !important' : 'block'}
                onClick={() => closeForm()}
            />
        </>
    );

    const onSubmit = (e) => {
        e.preventDefault();
        props.setIsLoading(true);
        const formData = {
            userName: formInput.userName.value.trim(),
            password: formInput.password.value.trim(),
        };
        if (!formInput.userName.value.trim()) {
            inputValidityHandler('userName', 'Morate uneti korisničko ime!');
        } else if (!formInput.password.value.trim()) {
            inputValidityHandler('password', 'Morate uneti lozinku!');
        } else {
            setLoginUser(formData);
        }
    };

    const inputClassName = isMobile ? classes.InputTextMob : classes.InputText;
    return (
        <form style={{ display: props.displayLogin }} className={classes.Form} onSubmit={onSubmit}>
            <h2 className={isMobile ? classes.FormTitleMob : classes.FormTitle}>PRIJAVA KORISNIKA</h2>
            <Input
                type="text"
                name="username"
                id={props.inputId}
                value={formInput.userName.value}
                placeholder="UNESITE KORISNIČKO IME"
                className={inputClassName}
                onChange={(e) => inputChanged(e, 'userName')}
                invalid={!formInput.userName.valid}
            />
            <Input
                type="password"
                name="password"
                value={formInput.password.value}
                placeholder="UNESITE LOZINKU"
                className={inputClassName}
                onChange={(e) => inputChanged(e, 'password')}
                invalid={!formInput.password.valid}
            />
            {buttonGroup}
        </form>
    );
};

export default Login;
