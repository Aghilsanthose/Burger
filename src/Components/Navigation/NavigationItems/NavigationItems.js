import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const navigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger Builder</NavigationItem>
      {props.isAuthenticated ? (
        <React.Fragment>
          <NavigationItem link="/logout">Logout</NavigationItem>
          <NavigationItem link="/orders">Orders</NavigationItem>
        </React.Fragment>
      ) : (
        <NavigationItem link="/signin">Signin</NavigationItem>
      )}
    </ul>
  );
};

export default navigationItems;
