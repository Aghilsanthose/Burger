import React from "react";
import classes from "./Input.module.css";

const input = props => {
  let inputElement = null;
  // console.log("Spreading the props", props.validation.requi);
  let inputClass = [classes.InputElement];
  if (!props.valid && props.validation && props.touched) {
    inputClass.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          onChange={event => {
            return props.onChangeHandler(event);
          }}
          className={inputClass.join(" ")}
          value={props.value}
          {...props.elementConfig}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <input
          onChange={props.onChangeHandler}
          className={inputClass.join(" ")}
          value={props.value}
          {...props.elementConfig}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          onChange={props.onChangeHandler}
          className={inputClass.join(" ")}
          value={props.value}
        >
          {props.elementConfig.options.map(option => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClass.join(" ")}
          value={props.value}
          {...props.elementConfig}
        />
      );
      break;
  }
  return <div className={classes.Input}>{inputElement}</div>;
};

export default input;
