//REFAKTORISANO
import { useDeviceDetect, inputChangedHandler } from '../../../helpers/universalFunctions';
import TextArea from './TextArea';
import Input from './Input';
import WrappedButtonsMob from '../WrappedButtonsMob';

import classes from '../UI.module.scss';

const ClientDescription = (props) => {
    const { isMobile } = useDeviceDetect();

    const closeForm = () => {
        props.setDisplayDescription('none');
        props.setDescriptionEdit(false);
        props.resetForm();
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = {
            Id: props.clientId,
            Name: props.formInput.name.value.trim(),
            Phone: props.formInput.mobOperator.value + props.formInput.phone.value.trim(),
            Email: props.formInput.email.value.trim(),
            Description: props.formInput.description.value.trim(),
        };
        props.setUserData(formData);
        props.setIsLoading(true);
    };

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
                <Input
                    type="button"
                    value="Sačavaj"
                    className={classes.SaveDescription}
                    display={isMobile ? 'none' : 'block'}
                    onClick={onSubmit}
                />
                <Input
                    type="button"
                    value="Zatvori"
                    className={classes.ExitDescription}
                    display={isMobile ? 'none' : 'block'}
                    onClick={() => closeForm()}
                />
                <WrappedButtonsMob
                    save={onSubmit}
                    isMobile={props.displayWrappedButtonsMob(props.displayDescription)}
                    displayForward="none"
                    displaySave="block"
                    displayAdd="none"
                    displayStopEdit="block"
                    stopEdit={() => closeForm()}
                    validation="true"
                />
            </div>
        </div>
    );
};

export default ClientDescription;
