const Appointment = (props) => (
  <div
    className={props.className}
    onMouseEnter={props.onMouseEnter}
    onMouseLeave={props.onMouseLeave}
    style={{
      display: props.display,
      position: props.position,
      height: props.height,
    }}
  >
    {props.children}
  </div>
)

export default Appointment
