import { useState, useEffect, useRef } from 'react';
import { useDeviceDetect, getErrorMessage, infoMessageHandler } from '../../helpers/universalFunctions';
import TextareaAutosize from 'react-textarea-autosize';
import InputText from '../UI/InputText';
import Title from './Title';
import Submit from '../UI/Submit';
import { saveContact } from '../../api/saveContact';

import classes from './HomePage.module.scss';

const ContactForm = () => {
    const { isMobile } = useDeviceDetect();
    const isComponentLoad = useRef(true);
    const [contactData, setContactData] = useState([]);
    const [formValidation, setFormValidation] = useState(true);

    const [formInput, setFormInput] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    function infoHandler(message) {
        infoMessageHandler(props.setShowInfoModal, message, !props.showInfoModal.triger, props.setIsLoading);
    }

    const onChange = e => {
        setFormInput({ ...formInput, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();
        const contact = {
            Message: formInput.message.trim(),
            /* ContactName: formInput.name.trim(), */
            ContactEmail: formInput.email.trim(),
            ContactPhone: formInput.phone.trim(),
        };

        if (
            formInput.name.trim() === '' ||
            formInput.email.trim() === '' ||
            formInput.phone.trim() === '' ||
            formInput.message.trim() === ''
        ) {
            alert('Popunite sva polja');
            setFormValidation(false);
        } else {
            setContactData([...contactData, contact]);
            alert('Hvala na Vašoj poruci. Uskoro ćemo Vam odgovoriti. Vaš KlikTermin'), setFormValidation(true);
        }
    };

    const saveContactHandler = () => {
        const api = saveContact(contactData)
            .then(res => {
                console.log(res);
                infoHandler('Uspešno sačuvano');
            })
            .catch(err => {
                console.log(err);
                /*  const errMessage = getErrorMessage(err.response);
                resHandler(errMessage); */
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

    console.log('hello');

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
            <InputText
                type="text"
                name="name"
                maxLength="30"
                placeholder="Unesite Ime i Prezime"
                borderColor={formValidation}
                onChange={onChange}
            />
            <InputText
                type="text"
                name="email"
                maxLength="30"
                placeholder="Unesite E-mail adresu"
                borderColor={formValidation}
                onChange={onChange}
            />
            <InputText
                type="text"
                name="phone"
                maxLength="10"
                placeholder="Unesite broj telefona"
                borderColor={formValidation}
                onChange={onChange}
            />
            <TextareaAutosize
                type="textarea"
                name="message"
                maxLength="500"
                className={classes.Message}
                placeholder="Postavite pitanje, napišite sugestiju, ideju, kritiku ili pohvalu"
                style={{ borderColor: formValidation ? 'inherit' : 'red' }}
                minRows={5}
                maxRows={40}
                onChange={onChange}
            />
            <Submit display="block" value="POŠALJI" onSubmit={onSubmit} />
        </form>
    );
};

export default ContactForm;
