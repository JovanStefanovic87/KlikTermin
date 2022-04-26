import WeekButton from './WeekButton';
import CurrWeek from './CurrWeek';

import classes from '../Calendar.module.scss';

const CalNav = (props) => (
  <div className={classes.CalNav}>
    <WeekButton
      value={props.leftArrow}
      margin={props.leftMargin}
      float={props.leftFloat}
      onClick={props.prevWeek}
    />
    <CurrWeek currWeek={props.currWeek} />
    <WeekButton
      value={props.rightArrow}
      margin={props.rightMargin}
      float={props.rightFloat}
      onClick={props.nextWeek}
    />
  </div>
);

export default CalNav;
