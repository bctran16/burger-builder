import React, {Component} from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENTS_PRICE = {
    salad: 1, cheese: 0.5, meat: 2, bacon: 1.5
}
class BurgerBuilder extends Component {

    state = {
        ingredients : {
            bacon: 0,
            meat: 0,
            cheese: 0,
            salad: 0
        },
        price: 4
    }


    addIngredientHandler = (type) => {
        const newCount = this.state.ingredients[type] +1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount; 
        const newPrice = this.state.price + INGREDIENTS_PRICE[type];
        this.setState({price: newPrice, ingredients: updatedIngredients});

    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] <=0) {
            return; 
        }
        const newCount = this.state.ingredients[type]-1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount; 
        const newPrice = this.state.price - INGREDIENTS_PRICE[type];
        this.setState({price: newPrice, ingredients: updatedIngredients});

    }

    render () {
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]<=0; 
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                addIngredient={this.addIngredientHandler} 
                removeIngredient={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.price}/>
            </Aux>

            )

    }
    
}

export default BurgerBuilder;