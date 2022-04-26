const PrepaidStatus = (props) => (
  <div style={{ display: props.display }} className={props.className}>
    <div>
      <label>
        {props.label}{' '}
        <span
          style={{ color: props.current < props.trigger ? 'red' : 'white' }}
        >
          {props.current}
        </span>{' '}
        {props.days}
      </label>
    </div>
  </div>
);

export default PrepaidStatus;
