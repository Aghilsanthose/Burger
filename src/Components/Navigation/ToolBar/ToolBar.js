import React from 'react';
import classes from './ToolBar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Menu from '../../Navigation/NavigationItems/Menu/Menu'
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem'

const toolBar = (props) => {
    // console.log("In ToolBar", props)

    return (
        <header className={classes.Toolbar}>
            <NavigationItem>
                <Menu show={props.Statusofsidebar} clicked={props.Sidebar} />
            </NavigationItem>
            {/* <Backdrop show={true} clicked={props.Sidebar} /> */}
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.Desktoponly}>
                <NavigationItems></NavigationItems>
            </nav>
        </header>
    )
}

export default toolBar