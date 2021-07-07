function Button({type, className, text, value, handleData}) {

    function handleClick(value) {
        handleData(value);
    }

    return (
        <button type={type} className={className} onClick={() => handleClick(value)}>
            {text}
        </button>
    )
}

export default Button;
