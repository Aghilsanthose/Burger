import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";
import React from "react";
import classes from "./SideDraw.module.css";

const sideDraw = props => {
  return (
    <div className={classes.Sidedraw} onClick={props.Sidebar}>
      <div className={classes.Logo}>
        <Logo />
      </div>

      <nav>
        <NavigationItems isAuthenticated={props.isAuthenticated} />
      </nav>
    </div>
  );
};

export default sideDraw;
