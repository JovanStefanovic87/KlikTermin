import { useState, useEffect, useRef } from 'react'
import { useDeviceDetect } from '../../../helpers/universalFunctions'
import Backdrop from '../Backdrop'
import Input from '../Forms/Input'

import classes from '../UI.module.scss'

const AppointmentConfirmModal = () => {
  const { isMobile } = useDeviceDetect()
  const isComponentLoad = useRef(true)
  const [animations, setAnimations] = useState({
    modal: '',
    backdrop: '',
    displayBackdrop: 'none',
  })
  const modalAnimationIn = isMobile ? classes.modalInMob : classes.modalInPC
  const modalAnimationOut = isMobile ? classes.modalOutMob : classes.modalOutPC
  const className = [classes.Response, modalAnimationIn].join(' ')
  const classNameMob = [classes.ResponseMob, animations.modal].join(' ')

  /* useEffect(() => {
        if (isComponentLoad.current) {
            isComponentLoad.current = false;
            return;
        }
        setAnimations({
            modal: modalAnimationIn,
            backdrop: classes.backdropIn,
            displayBackdrop: 'block',
        });
    }, [props.showResponseModal.triger]); */

  return (
    <>
      <Backdrop
        backdropAnimation={classes.backdropIn}
        display={'block'}
        zIndex={`${9999}!important`}
      />
      <div
        className={isMobile ? classNameMob : className}
        /* style={{ borderColor: props.showResponseModal.border }} */
      >
        <p>Ime i prezime: Jovan Stefanovic</p>
        <p>Telefon: 0691120296</p>
        <p>Termin: 09:00</p>
        <p>
          <underline>Usluge</underline>
        </p>
        <p>Sisanje</p>
        <p>Brijanje</p>
        <p>Cena ukupno: 500rsd</p>
        <Input
          type="button"
          value="OK"
          /* display={props.showButton} */
          display={'block'}
          className={classes.Confirm}
          /* onClick={() => removeModalHandler()} */
        />
      </div>
    </>
  )
}

export default AppointmentConfirmModal
