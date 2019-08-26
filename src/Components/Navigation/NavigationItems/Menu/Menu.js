import React from "react";
import classes from "./Menu.module.css";
import Backdrop from "../../../UI/Backdrop/Backdrop";

const menu = props => {
  // console.log("In menu ", props)

  return (
    <React.Fragment>
      <div onClick={props.clicked} className={classes.Initial}>
        <div>
          <div className={classes.Whiteline}></div>
          <div className={classes.Whiteline}></div>
          <div className={classes.Whiteline}></div>
        </div>
        <div className={classes.Menu}>Menu</div>
      </div>

      <Backdrop show={props.show} clicked={props.clicked} />
    </React.Fragment>
  );
};

export default menu;
