import React from "react";
import classes from "./order.module.css";

const order = props => {
  const list = [];
  for (let i in props.order.ingridents) {
    if (props.order.ingridents[i] > 0) {
      list.push(`${i} ${props.order.ingridents[i]}`);
    }
  }

  //console.log("In order", props.order.totalPrice);

  return (
    <div className={classes.Order}>
      <p> List of Ingridents</p>
      {list.map((item, index) => {
        return <p>{item}</p>;
      })}
      <p>
        Total Price : <strong>{props.order.totalPrice}</strong>
      </p>
    </div>
  );
};

export default order;
