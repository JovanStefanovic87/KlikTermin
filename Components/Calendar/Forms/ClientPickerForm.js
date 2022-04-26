import { useDeviceDetect } from '../../../helpers/universalFunctions';

import Filter from '../../UI/Filter';
import Table from '../../UI/Table';
import Input from '../../UI/Forms/Input';

import classes from '../../UI/UI.module.scss';

const ClientPickerForm = (props) => {
    const { isMobile } = useDeviceDetect();

    if (isMobile) {
        return (
            <form style={{ display: props.displayClientPicker }} className={classes.Form}>
                <h3 className={classes.FormTitleMob}>IZBOR KLIJENTA</h3>
                <Input
                    type="button"
                    value="NOVI KLIJENT"
                    display="inline-block"
                    width="45%"
                    float="left"
                    margin="0 auto 10px auto"
                    className={classes.FormButtonMob}
                />

                <Input
                    type="button"
                    value="SAČUVAJ UNOS"
                    display="inline-block"
                    className={classes.FormButtonMob}
                    width="45%"
                    float="right"
                    margin="0 auto 10px auto"
                />
                <Filter className={classes.Filter} placeholder="Pretraga klijenata (unesite ime ili broj telefona)" />
                <Table
                    maxHeight="calc(100vh - 300px)"
                    nedefinisaniKlijent={
                        <tr className={classes.Clients}>
                            <td
                                style={{
                                    width: '100vw',
                                    height: '40px',
                                    border: 'none',
                                    borderTop: '6px ridge gray',
                                    backgroundImage: 'linear-gradient(to top, #202020, #303030, #202020)',
                                }}
                            >
                                ---NEDEFINISANI KLIJENT---
                            </td>
                        </tr>
                    }
                    bodyData={props.bodyDataMob}
                />
                <div>
                    <Input
                        type="button"
                        value="ODUSTANI"
                        className={classes.FormButton}
                        width="50%"
                        margin="-10px auto auto auto"
                        color="orangered"
                        onClick={() => {
                            props.setDisplayClientPicker('none'), props.hideBackdrop();
                        }}
                    />
                </div>
            </form>
        );
    }
    return (
        <form style={{ display: props.displayClientPicker }} className={classes.Form}>
            <h2 className={classes.FormTitle}>IZBOR KLIJENTA</h2>
            <Input
                type="button"
                value="NOVI KLIJENT"
                display="block"
                margin="auto auto 10px auto"
                classNameButton={classes.FormButton}
            />
            <Input type="button" value="SAČUVAJ UNOS" className={classes.FormButton} />
            <Filter className={classes.Filter} placeholder="Pretraga klijenata (unesite ime ili broj telefona)" />
            <Table
                maxHeight="calc(100vh - 300px)"
                headData={
                    <tr>
                        <th>Ime i prezime</th>
                        <th style={{ width: '180px', minWidth: '180px' }}>Broj telefona</th>
                        <th>E-mail</th>
                    </tr>
                }
                nedefinisaniKlijent={
                    <tr>
                        <td colSpan="3" className={classes.Clients}>
                            ---NEDEFINISANI KLIJENT---
                        </td>
                    </tr>
                }
                bodyData={props.bodyData}
            />
            <div>
                <Input
                    type="button"
                    value="ODUSTANI"
                    className={classes.FormButton}
                    marginLeft="1%"
                    color="orangered"
                    onClick={() => {
                        props.setDisplayClientPicker('none'), props.hideBackdrop();
                    }}
                />
            </div>
        </form>
    );
};

export default ClientPickerForm;
