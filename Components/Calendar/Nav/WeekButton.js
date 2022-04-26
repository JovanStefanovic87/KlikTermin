const WeekButton = (props) => (
  <input
    type="button"
    style={{ margin: props.margin, float: props.float }}
    onClick={props.onClick}
    value={props.value}
  />
);

export default WeekButton;
