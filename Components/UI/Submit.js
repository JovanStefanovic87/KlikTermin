const Submit = (props) => (
  <button
    type="submit"
    className={props.className}
    style={{
      display: props.display,
      width: props.width,
      height: props.height,
      margin: props.margin,
      float: props.float,
      fontSize: props.fontSize,
      color: props.color,
    }}
    onSubmit={props.onSubmit}
  >
    {props.value}
  </button>
);

export default Submit;
