import React, { Component } from 'react';
import classes from './BurgerIngridents.module.css'
import Proptypes from 'prop-types'

class BurgerIngridents extends Component {
    state = {}
    render() {
        let Ingredients = null;
        switch (this.props.type) {
            case ('bread-bottom'):
                Ingredients = <div className={classes.BreadBottom}></div>
                break;
            case ('bread-top'):
                Ingredients = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds1}></div>
                    </div>
                )
                break
            case ('meat'):
                Ingredients = <div className={classes.Meat}></div>
                break
            case ('cheese'):
                Ingredients = <div className={classes.Cheese}></div>
                break
            case ('salad'):
                Ingredients = <div className={classes.Salad}></div>
                break
            case ('bacon'):
                Ingredients = <div className={classes.Bacon}></div>
                break
            default:
                Ingredients = null
        }
        return Ingredients

    }
}


BurgerIngridents.propTypes = {
    type: Proptypes.string.isRequired
}

export default BurgerIngridents