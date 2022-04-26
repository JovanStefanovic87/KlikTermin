const DescriptionLabel = (props) => (
    <p className={props.className} style={{ color: props.color, margin: props.margin }}>
        {props.text}
    </p>
);

export default DescriptionLabel;
