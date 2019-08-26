import React from 'react';
import classes from '../BuildControl/BuildControl.module.css';
const buildControl = (props) => {
    // console.log("BuildControl", props.Label)
    return (<div className={classes.BuildControl}>

        <div className={classes.Label}>
            {props.Label}</div>
        <button onClick={props.removal} className={classes.Less} disabled={props.disabled}>Less</button>
        <button onClick={props.addition} className={classes.More}>More</button>

    </div>)
}

export default buildControl