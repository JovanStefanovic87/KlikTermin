import { useState, useEffect, useRef } from 'react';
import { useDeviceDetect } from '../../../helpers/universalFunctions';
import Backdrop from '../Backdrop';
import Input from '../Forms/Input';

import classes from '../UI.module.scss';

const ConfirmModal = (props) => {
    const { isMobile } = useDeviceDetect();
    const isComponentLoad = useRef(true);
    const [animations, setAnimations] = useState({
        modal: '',
        backdrop: '',
        displayBackdrop: 'none',
    });
    const modalAnimationIn = isMobile ? classes.modalInMob : classes.modalInPC;
    const modalAnimationOut = isMobile ? classes.modalOutMob : classes.modalOutPC;
    const className = [classes.Response, animations.modal].join(' ');
    const classNameMob = [classes.ResponseMob, animations.modal].join(' ');

    useEffect(() => {
        if (isComponentLoad.current) {
            isComponentLoad.current = false;
            return;
        }
        setAnimations({
            modal: modalAnimationIn,
            backdrop: classes.backdropIn,
            displayBackdrop: 'block',
        });
    }, [props.showConfirmModal.triger]);

    function submitHandler() {
        props.onSubmit();
        setAnimations({
            modal: modalAnimationOut,
            backdrop: classes.backdropOut,
            displayBackdrop: 'none',
        });
    }

    function removeModalHandler() {
        setAnimations({
            modal: modalAnimationOut,
            backdrop: classes.backdropOut,
            displayBackdrop: 'none',
        });
        isMobile ? {} : props.itemId(null);
    }

    return (
        <>
            <Backdrop
                backdropAnimation={animations.backdrop}
                display={animations.displayBackdrop}
                zIndex={`${9999}!important`}
            />
            <div className={isMobile ? classNameMob : className} style={{ display: 'block', borderColor: '#FDFD96' }}>
                <p>{props.showConfirmModal.message}</p>
                <Input
                    type="button"
                    value={props.submitValue}
                    onClick={() => submitHandler()}
                    className={classes.Confirm}
                />
                <Input
                    type="button"
                    value="ODUSTANI"
                    onClick={() => removeModalHandler()}
                    className={classes.Decline}
                />
            </div>
        </>
    );
};

export default ConfirmModal;
