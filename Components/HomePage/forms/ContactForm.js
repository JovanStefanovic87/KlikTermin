//REFAKTURISANO
import { useState, useRef, useEffect } from 'react';
import {
    useDeviceDetect,
    updateValidity,
    inputChangedHandler,
    responseHandler,
    getErrorMessage,
    emailPattern,
    numericPattern,
} from '../../../helpers/universalFunctions';
import initState from './initState';
import { saveContact } from '../../../api/saveContact';
import Input from '../../UI/Forms/Input';
import Title from '../Title';
import TextArea from '../../UI/Forms/TextArea';

import classes from '../HomePage.module.scss';

const ContactForm = props => {
    const { isMobile } = useDeviceDetect();
    const isComponentLoad = useRef(true);
    const [contactData, setContactData] = useState([]);
    const responseMessage = 'Primili smo Vašu poruku. Uskoro ćemo Vam odgovoriti. Hvala!';
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

    function resetForm() {
        setFormInput(initState);
        responseHandler(
            props.setShowResponseModal,
            responseMessage,
            'green',
            !props.showResponseModal.triger,
            props.setIsLoading,
        );
    }

    const inputValidityHandler = (inputName, message) => {
        updateValidity(setFormInput, formInput, inputName, '', false);
        resHandler(message);
    };

    const saveContactHandler = async () => {
        const api = await saveContact(contactData)
            .then(() => resetForm())
            .catch(err => {
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
        saveContactHandler();
    }, [contactData]);

    // Function for limit maxLength for input type='number'
    /* const maxLengthCheck = element => {
		if (element.target.value.length > element.target.maxLength) {
			element.target.value = element.target.value.slice(0, element.target.maxLength)
		}
	} */

    const onSubmit = e => {
        e.preventDefault();
        const formData = {
            Message: formInput.message.value.trim(),
            /* ContactName: formInput.name.value.trim(), */
            ContactPhone: formInput.phone.value.trim(),
            ContactEmail: formInput.email.value.trim(),
        };
        if (!formInput.name.value.trim()) {
            inputValidityHandler('name', 'Morate uneti Ime i prezime!');
        } else if (!formInput.email.value.trim() || !emailPattern.test(formInput.email.value)) {
            inputValidityHandler('email', 'Morate uneti validnu e-mail adresu!');
        } else if (
            !formInput.phone.value.trim() ||
            !numericPattern.test(formInput.phone.value) ||
            formInput.phone.value.length < 9
        ) {
            inputValidityHandler('phone', 'Morate uneti validan broj telefona!');
        } else if (!formInput.message.value.trim()) {
            inputValidityHandler('message', 'Morate uneti tekst poruke!');
        } else {
            setContactData(formData);
        }
    };

    return (
        <form className={isMobile ? classes.ContactMob : classes.Contact} onSubmit={onSubmit}>
            <Title txt="KONTAKT" top="20px" />
            <h2>Informacije</h2>
            <div className={classes.InfoBg}>
                <p>
                    <strong>Email:</strong> office@kliktermin.com
                </p>
                <p>
                    <strong>Pomoć i podrška:</strong> 060/492-5469
                </p>
                <p>
                    <strong>Marketing:</strong> 069/112-0296
                </p>
            </div>
            <h2>Ostavite nam poruku</h2>
            <Input
                type="text"
                name="name"
                maxLength="30"
                placeholder="Unesite Ime i Prezime"
                value={formInput.name.value}
                className={classes.Contact_Input}
                onChange={e => inputChangedHandler(e, 'name', formInput, setFormInput)}
                invalid={!formInput.name.valid}
            />
            <Input
                type="text"
                name="email"
                maxLength="50"
                placeholder="Unesite E-mail adresu"
                value={formInput.email.value}
                className={classes.Contact_Input}
                onChange={e => inputChangedHandler(e, 'email', formInput, setFormInput)}
                invalid={!formInput.email.valid}
            />
            <Input
                type="number"
                name="phone"
                maxLength="10"
                placeholder="Unesite broj telefona"
                value={formInput.phone.value}
                className={classes.Contact_Input}
                onChange={e => inputChangedHandler(e, 'phone', formInput, setFormInput)}
                invalid={!formInput.phone.valid}
            />
            <TextArea
                name="message"
                maxLength="500"
                placeholder="Postavite pitanje, napišite sugestiju, ideju, kritiku ili pohvalu"
                value={formInput.message.value}
                minRows="5"
                maxRows="40"
                className={classes.Contact_Input}
                onChange={e => inputChangedHandler(e, 'message', formInput, setFormInput)}
                invalid={!formInput.message.valid}
            />
            <Input type="submit" className={classes.Submit} display="block" value="POŠALJI" />
        </form>
    );
};

export default ContactForm;
