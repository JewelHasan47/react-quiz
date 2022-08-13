import React from 'react';
import classes from '../styles/Button.module.css';

const Button = ( { type, className, children } ) => {
    return (
        <button type={ type } className={ `${ classes.button } ${ className }` }>
            { children }
        </button>
    );
};

export default Button;