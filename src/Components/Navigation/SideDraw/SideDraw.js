import NavigationItems from '../NavigationItems/NavigationItems'
import Logo from '../../Logo/Logo'
import React from 'react';
import classes from './SideDraw.module.css'

const sideDraw = (props) => {
    return (
        <div className={classes.Sidedraw}>
            <div className={classes.Logo}>
                <Logo />
            </div>

            <nav>
                <NavigationItems />
            </nav>
        </div>

    )
}

export default sideDraw