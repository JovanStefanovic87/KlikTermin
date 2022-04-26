const Time = (props) => (
  <>
    {props.minMaxWorkingHours.map((obj, i) => (
      <tr key={i}>
        <td>{obj}</td>
      </tr>
    ))}
  </>
);

export default Time;
