import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDeviceDetect } from '../../helpers/universalFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import Slides from './Slides';
import Radio from '../UI/Radio';

import classes from './HomePage.module.scss';

const Slider = () => {
    const { isMobile } = useDeviceDetect();
    const [newActive, setNewActive] = useState(classes.slideAuto);
    const [prevActive, setPrevActive] = useState(classes.slideOld);
    const [curr, setCurr] = useState(0);
    const [timer, setTimer] = useState(true);
    const sycle = Slides.length;

    function autoSlide() {
        if (timer === true) {
            setCurr(curr === sycle - 1 ? 0 : curr + 1);
        } else {
            clearInterval(autoSlide);
        }
    }
    useEffect(() => {
        const intervalID = setInterval(autoSlide, 8000);
        if (timer === true) {
            intervalID;
        }
        return () => {
            clearInterval(intervalID);
        };
    });

    function showPrev() {
        setTimer(false);
        setNewActive(classes.slidePrev);
        setPrevActive(classes.slideOld);
        setCurr(curr < 1 ? 2 : curr - 1);
    }

    function showNext() {
        setTimer(false);
        setNewActive(classes.slideNext);
        setPrevActive(classes.slideOld);
        setCurr(curr === sycle - 1 ? 0 : curr + 1);
    }

    const First = () => {
        setCurr(0);
        setPrevActive(classes.slideNew);
        setNewActive(classes.slideNext);
        setTimer(false);
    };

    const Second = () => {
        setCurr(1);
        setPrevActive(classes.slideNew);
        setNewActive(classes.slideNext);
        setTimer(false);
    };

    const Third = () => {
        setCurr(2);
        setPrevActive(classes.slideNew);
        setNewActive(classes.slideNext);
        setTimer(false);
    };

    return (
        <div className={classes.SliderContainer}>
            {Slides.map((s, i) => (
                <Link href={Slides[curr].link} key={s.id}>
                    <a>
                        <Image
                            src={s.image}
                            alt={s.title}
                            layout="fill"
                            className={i === curr ? newActive : prevActive}
                        />
                    </a>
                </Link>
            ))}
            <FontAwesomeIcon
                icon={faAngleLeft}
                className={isMobile ? classes.ArrowLeftMob : classes.ArrowLeft}
                onClick={showPrev}
            />
            <FontAwesomeIcon
                icon={faAngleRight}
                className={isMobile ? classes.ArrowRightMob : classes.ArrowRight}
                onClick={showNext}
            />
            <div className={classes.radioContainer}>
                <Radio
                    htmlFor="firstradio"
                    name="slider"
                    onClick={First}
                    id="firstradio"
                    display={isMobile ? 'none' : 'inline-block'}
                />
                <Radio
                    htmlFor="secondradio"
                    name="slider"
                    onClick={Second}
                    id="secondradio"
                    display={isMobile ? 'none' : 'inline-block'}
                />
                <Radio
                    htmlFor="thirdradio"
                    name="slider"
                    onClick={Third}
                    id="thirdradio"
                    display={isMobile ? 'none' : 'inline-block'}
                />
            </div>
        </div>
    );
};

export default Slider;
