import React from 'react';
import burgerLogo from '../../Assets/Images/burger-logo.png'
import classes from './Logo.module.css'
const logo = () => {
    return (
        <div className={classes.Logo}>
            <img src={burgerLogo} alt="BurgerLogo"></img>
        </div>
    )

}

export default logo