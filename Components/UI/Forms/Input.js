import classes from '../UI.module.scss';

const Input = (props) => {
    const inputClasses = {
        valid: props.className,
        invalid: [props.className, classes.InvalidInput].join(' '),
    };

    const maxLengthCheck = (element) => {
        // Function for limit maxLength for input type='number'
        if (element.target.type === 'number') {
            if (element.target.value.length > element.target.maxLength) {
                element.target.value = element.target.value.slice(0, element.target.maxLength);
            }
        }
    };

    return (
        // eslint-disable-next-line react/void-dom-elements-no-children
        <input
            type={props.type}
            pattern={props.pattern}
            name={props.name}
            value={props.value}
            id={props.id}
            className={!props.invalid ? inputClasses.valid : inputClasses.invalid}
            ref={props.ref}
            placeholder={props.placeholder}
            onInput={(element) => maxLengthCheck(element)}
            onChange={props.onChange}
            onSubmit={props.onSubmit}
            onClick={props.onClick}
            maxLength={props.maxLength}
            minLength={props.minLength}
            rows={props.rows}
            cols={props.cols}
            defaultChecked={props.defaultChecked}
            readOnly={props.readOnly}
            checked={props.checked}
            style={{
                display: props.display,
                width: props.width,
                maxWidth: props.maxWidth,
                height: props.height,
                margin: props.margin,
                marginLeft: props.marginLeft,
                marginTop: props.marginTop,
                marginBottom: props.marginBottom,
                float: props.float,
                fontSize: props.fontSize,
                color: props.color,
                pointerEvents: props.pointerEvents,
            }}
        />
    );
};

export default Input;
