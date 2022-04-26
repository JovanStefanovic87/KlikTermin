const InputText = (props) => (
  <input
    className={props.className}
    style={{
      display: props.display,
      width: props.width,
      maxWidth: props.maxWidth,
      margin: props.margin,
      fontSize: props.fontSize,
      borderColor: props.borderColor ? 'inherit' : 'red',
    }}
    type={props.type}
    id={props.name}
    name={props.name}
    maxLength={props.maxLength}
    rows={props.rows}
    cols={props.cols}
    placeholder={props.placeholder}
    value={props.value}
    onChange={props.onChange}
  />
);

export default InputText;
