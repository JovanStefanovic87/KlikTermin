import { useDeviceDetect } from '../../../helpers/universalFunctions';

import Filter from '../../UI/Filter';
import Table from '../../UI/Table';
import Input from '../../UI/Forms/Input';

import classes from '../../UI/UI.module.scss';

const ServicePickerForm = (props) => {
    const { isMobile } = useDeviceDetect();

    if (isMobile) {
        return (
            <form style={{ display: props.displayServicesPicker }} className={classes.Form}>
                <h4 className={classes.FormTitleMob}>IZBOR USLUGA</h4>
                <Filter className={classes.Filter} placeholder="Pretraga usluga(unesite naziv usluge)" />
                <Table displayHeader="none" bodyData={props.bodyDataMob} />
                <div>
                    <Input
                        type="button"
                        value="IZMENA"
                        display="inline-block"
                        width="20%"
                        height="3rem"
                        margin="-15px 0"
                        float="left"
                        fontSize="0.9rem"
                        className={classes.FormButton}
                    />
                    <Input
                        type="button"
                        value="ZAKAŽI TERMIN"
                        display="inline-block"
                        width="auto"
                        height="3rem"
                        margin="-15px 0"
                        fontSize="7vw"
                        className={classes.FormButton}
                        onClick={(e) => {
                            e.preventDefault();
                            props.setAppointment();
                            props.setDisplayServicesPicker('none');
                            props.setDisplayClientPicker('none');
                            props.hideBackdrop();
                        }}
                    />
                    <Input
                        type="button"
                        value="ODUSTANI"
                        display="inline-block"
                        width="20%"
                        height="3rem"
                        margin="-15px 0"
                        float="right"
                        fontSize="0.7rem"
                        color="orangered"
                        onClick={() => {
                            props.setDisplayServicesPicker('none');
                            props.setDisplayClientPicker('none');
                            props.hideBackdrop();
                            props.setCheckedServices([]);
                        }}
                        className={classes.FormButton}
                    />
                </div>
            </form>
        );
    } else {
        return (
            <form style={{ display: props.displayServicesPicker }} className={classes.Form}>
                <h2 className={classes.FormTitle}>IZBOR USLUGA</h2>
                <Filter className={classes.Filter} placeholder="Pretraga usluga (unesite naziv usluge)" />
                <Table headData={props.headData} bodyData={props.bodyData} />
                <div>
                    <Input
                        type="button"
                        value="ZAKAŽI TERMIN"
                        display="block"
                        margin="auto auto 5px auto"
                        className={classes.FormButton}
                        onClick={(e) => {
                            e.preventDefault();
                            props.setAppointment();
                            props.setDisplayServicesPicker('none');
                            props.setDisplayClientPicker('none');
                            props.hideBackdrop();
                        }}
                    />
                    <Input
                        type="button"
                        value="IZMENA TERMINA"
                        margin="auto 2px auto auto"
                        className={classes.FormButton}
                    />
                    <Input
                        type="button"
                        value="ODUSTANI"
                        margin="auto auto auto 2px"
                        color="orangered"
                        onClick={() => {
                            props.setDisplayServicesPicker('none');
                            props.setDisplayClientPicker('none');
                            props.hideBackdrop();
                            props.setCheckedServices([]);
                        }}
                        className={classes.FormButton}
                    />
                </div>
            </form>
        );
    }
};

export default ServicePickerForm;
