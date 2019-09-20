import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from '../BuildControls/BuildControl/BuildControl'

const IngredientsArr = [
    { Label: "Salad", type: "salad" },
    { Label: "Meat", type: "meat" },
    { Label: "Cheese", type: "cheese" },
    { Label: "Bacon", type: "bacon" }
]


const buildControls = (props) => {
    // console.log("Purchase", props.Purchasable)
    return (<div className={classes.BuildControls}>
        <p>Current Total Price : <strong>{props.price.toFixed(2)}</strong> </p>
        {IngredientsArr.map(ctrl => {
            return (<BuildControl
                key={ctrl.Label}
                Label={ctrl.Label}
                type={ctrl.type}
                addition={() => props.addition(ctrl.type)}
                removal={() => props.removal(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />)
        })}
        <button onClick={props.OrderSummary} className={classes.OrderButton} disabled={props.Purchasable}>{props.isAuthendicated?"Order Now" : "Sign Up for Order" }</button>


    </div>)
}

export default buildControls