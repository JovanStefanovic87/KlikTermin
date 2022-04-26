import { useState, useEffect, useRef } from 'react';
import { useDeviceDetect } from '../../../helpers/universalFunctions';
import Backdrop from '../Backdrop';

import classes from '../UI.module.scss';

const InfoModal = (props) => {
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

    const completnessMessageHandler = () => {
        setAnimations({
            modal: modalAnimationIn,
            backdrop: classes.backdropIn,
            displayBackdrop: 'block',
        });
        setTimeout(() => {
            setAnimations({
                modal: modalAnimationOut,
                backdrop: classes.backdropOut,
                displayBackdrop: 'none',
            });
        }, 2000);
    };

    useEffect(() => {
        if (isComponentLoad.current) {
            isComponentLoad.current = false;
            return;
        }
        completnessMessageHandler();
    }, [props.showInfoModal.triger]);

    return (
        <>
            <Backdrop
                backdropAnimation={animations.backdrop}
                display={animations.displayBackdrop}
                zIndex={`${9999}!important`}
            />
            <div
                className={isMobile ? classNameMob : className}
                style={{ display: 'block', borderColor: props.borderColor }}
            >
                <p>{props.showInfoModal.message}</p>
            </div>
        </>
    );
};

export default InfoModal;
