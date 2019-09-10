import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger Ingridents={props.Ingridents} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutcancel}>
        Cancel
      </Button>
      <Button btnType="Danger" clicked={props.checkoutcontinue}>
        Continue
      </Button>
    </div>
  );
};

export default checkoutSummary;
