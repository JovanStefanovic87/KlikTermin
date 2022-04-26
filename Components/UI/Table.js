const Table = (props) => (
  <table style={{ maxHeight: props.maxHeight }}>
    <thead style={{ display: props.displayHeader }}>{props.headData}</thead>
    <tbody>
      {props.nedefinisaniKlijent}
      {props.bodyData}
    </tbody>
  </table>
);

export default Table;
