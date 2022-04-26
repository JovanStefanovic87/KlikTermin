import classes from './UI.module.scss';

const Backdrop = (props) => {
    const className = [classes.Backdrop, props.backdropAnimation].join(' ');
    return (
        <div
            className={className}
            style={{
                display: props.display,
                zIndex: props.zIndex,
                backgroundColor: props.color,
            }}
            onClick={props.onClick}
        />
    );
};

export default Backdrop;
