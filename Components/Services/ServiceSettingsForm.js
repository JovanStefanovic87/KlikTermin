//REFAKTORISANO - mozda potrebno dodatno, ali videcemo nakon testiranja
import CheckBox from '../UI/CheckBox';

import classes from '../Navigation/Navigation.module.scss';

const ServiceSettingsForm = (props) => {
    return (
        <>
            {props.serviceSettings
                .filter((data) => data.idService.includes(props.serviceId))
                .map(() => {
                    return (
                        <div key={props.serviceId} className={classes.AddForSelectedWrapperLeftAlign}>
                            <div>
                                <CheckBox
                                    name="omiljenaUslugaMob"
                                    className={classes.addForSelected}
                                    defaultChecked={props.serviceSettingsData.favoriteService}
                                    onClick={() =>
                                        props.setServiceSettingsData({
                                            ...props.serviceSettingsData,
                                            ['favoriteService']: !props.serviceSettingsData.favoriteService,
                                        })
                                    }
                                />
                                <p>Omiljena usluga?</p>
                            </div>
                            <div>
                                <CheckBox
                                    name="izabranaUslugaMob"
                                    className={classes.addForSelected}
                                    defaultChecked={props.serviceSettingsData.alwaysSelected}
                                    onClick={() =>
                                        props.setServiceSettingsData({
                                            ...props.serviceSettingsData,
                                            ['alwaysSelected']: !props.serviceSettingsData.alwaysSelected,
                                        })
                                    }
                                />
                                <p>Uvek izabrana usluga?</p>
                            </div>
                            <div>
                                <CheckBox
                                    name="koristimUsluguMob"
                                    className={classes.addForSelected}
                                    defaultChecked={props.serviceSettingsData.serviceInUse}
                                    onClick={() =>
                                        props.setServiceSettingsData({
                                            ...props.serviceSettingsData,
                                            ['serviceInUse']: !props.serviceSettingsData.serviceInUse,
                                        })
                                    }
                                />
                                <p>Koristim uslugu!</p>
                            </div>
                            <div>
                                <CheckBox
                                    name="klijentiVideCenuMob"
                                    className={classes.addForSelected}
                                    defaultChecked={props.serviceSettingsData.clientsSeePrice}
                                    onClick={() =>
                                        props.setServiceSettingsData({
                                            ...props.serviceSettingsData,
                                            ['clientsSeePrice']: !props.serviceSettingsData.clientsSeePrice,
                                        })
                                    }
                                />
                                <p>Klijenti vide cenu usluge?</p>
                            </div>
                            <div>
                                <CheckBox
                                    name="klijentiVideUsluguMob"
                                    className={classes.addForSelected}
                                    defaultChecked={props.serviceSettingsData.clientsSeeService}
                                    onClick={() =>
                                        props.setServiceSettingsData({
                                            ...props.serviceSettingsData,
                                            ['clientsSeeService']: !props.serviceSettingsData.clientsSeeService,
                                        })
                                    }
                                />
                                <p>Klijenti vide uslugu?</p>
                            </div>
                            <input
                                type="button"
                                value="Sačuvaj"
                                className={classes.SaveServiceSettings}
                                style={{
                                    margin: '20px auto 0 35%',
                                    fontSize: '2em',
                                    padding: '5px',
                                }}
                                onClick={() => props.saveSettingsServicesHandler()}
                            />
                        </div>
                    );
                })}
            ;
        </>
    );
};

export default ServiceSettingsForm;
