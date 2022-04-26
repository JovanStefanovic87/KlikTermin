import { useState, useEffect, useRef } from 'react'
import { useDeviceDetect } from '../../../helpers/universalFunctions'
import Link from 'next/link'
import Input from '../Forms/Input'

import classes from '../UI.module.scss'
import Backdrop from '../Backdrop'

const VerifyModal = (props) => {
  const { isMobile } = useDeviceDetect()
  const isComponentLoad = useRef(true)
  const [animations, setAnimations] = useState({
    modal: '',
    backdrop: '',
    displayBackdrop: 'none',
  })
  const modalAnimationIn = isMobile ? classes.modalInMob : classes.modalInPC
  const className = [classes.Response, animations.modal].join(' ')
  const classNameMob = [classes.ResponseMob, animations.modal].join(' ')

  useEffect(() => {
    if (isComponentLoad.current) {
      isComponentLoad.current = false
      return
    }
    setAnimations({
      modal: modalAnimationIn,
      backdrop: classes.backdropIn,
      displayBackdrop: 'block',
    })
  }, [props.modalTriger])

  return (
    <>
      <Backdrop
        backdropAnimation={animations.backdrop}
        display={animations.displayBackdrop}
        zIndex={`${9999}!important`}
      />
      <div
        className={isMobile ? classNameMob : className}
        style={{ display: props.display, borderColor: props.borderColor }}
      >
        <p>{props.message}</p>
        <Link href="/">
          <Input type="button" value="OK" className={classes.Confirm} />
        </Link>
      </div>
    </>
  )
}

export default VerifyModal
