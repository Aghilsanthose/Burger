import React from "react";
import classes from "./BackDrop.module.css";
const backDrop = props => {
  return props.show ? (
    <div onClick={props.clicked} className={classes.Backdrop}></div>
  ) : null;
};

export default backDrop;
