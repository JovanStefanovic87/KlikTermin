const Event = props => {
	return (
		<div
			className={props.className}
			style={{
				display: props.display,
				position: props.position,
				height: props.height,
			}}>
			{props.children}
		</div>
	);
};

export default Event;
