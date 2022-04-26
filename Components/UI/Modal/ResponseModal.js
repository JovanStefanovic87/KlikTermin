import { useState, useEffect, useRef } from 'react';
import { useDeviceDetect } from '../../../helpers/universalFunctions';
import Backdrop from '../Backdrop';
import Input from '../Forms/Input';

import classes from '../UI.module.scss';

const ResponseModal = (props) => {
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
    }, [props.showResponseModal.triger]);

    function removeModalHandler() {
        setAnimations({
            modal: modalAnimationOut,
            backdrop: classes.backdropOut,
            displayBackdrop: 'none',
        });
    }

    return (
        <>
            <Backdrop
                backdropAnimation={animations.backdrop}
                display={animations.displayBackdrop}
                zIndex={`${9999}!important`}
            />
            <div
                className={isMobile ? classNameMob : className}
                style={{ borderColor: props.showResponseModal.border }}
            >
                <p>{props.showResponseModal.message}</p>
                <Input
                    type="button"
                    value="OK"
                    display={props.showButton}
                    className={classes.Confirm}
                    onClick={() => removeModalHandler()}
                />
            </div>
        </>
    );
};

export default ResponseModal;
