import React from "react";
import classes from "./Burger.module.css";
import BurgerIngridents from "./BurgerIngridents/BurgerIngridents";

const Burger = props => {
  let transformedIngrident = props.Ingridents
    ? Object.keys(props.Ingridents)
        .map(igKey => {
          return [...Array(props.Ingridents[igKey])].map((_, i) => {
            return <BurgerIngridents key={igKey + i} type={igKey} />;
          });
        })
        .reduce((arr, el) => {
          return arr.concat(el);
        }, [])
    : [];

  //console.log("In Burger", transformedIngrident);

  //console.log("In Burger", transformedIngrident.length);

  if (transformedIngrident.length === 0) {
    // console.log("In IF statement")
    transformedIngrident = <p>Please add ingridents</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngridents type="bread-top" />
      {transformedIngrident}
      <BurgerIngridents type="bread-bottom" />
    </div>
  );
};

export default Burger;
