import React from "react";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

const navigationItem = props => {
  // console.log("In Navigation Item", props.active);
  return (
    <li className={classes.NavigationItem}>
      <NavLink to={props.link} exact activeClassName={classes.active}>
        {props.children}
      </NavLink>
    </li>
  );
};

export default navigationItem;
