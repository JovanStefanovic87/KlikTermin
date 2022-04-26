const Days = (props) => (
    <>
        {props.days.map((day, i) => (
            <th key={day}>{props.date(i)}</th>
        ))}
    </>
);

export default Days;
