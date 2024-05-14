import React from 'react';

function Button(props) {
    const defaultStyles = {
        width: '136px',
        height: '44px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: "16px"
    };

    // Merge default styles with custom styles passed via props
    const mergedStyles = { ...defaultStyles, ...props.style };

    return (
        <button style={mergedStyles} type={props.type} onClick={props.handleClick}>
            {props.title}
        </button>
    );
}

export default Button;