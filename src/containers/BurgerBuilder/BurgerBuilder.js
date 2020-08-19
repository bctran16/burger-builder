import React, {Component} from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

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
        purchasable: false,
        purchasing: false,
        price: 4
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, el) => {
                return sum+ el;
            },0);
        this.setState({purchasable: sum>0});
    }


    addIngredientHandler = (type) => {
        const newCount = this.state.ingredients[type] +1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount; 
        const newPrice = this.state.price + INGREDIENTS_PRICE[type];
        this.setState({price: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

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
        this.updatePurchaseState(updatedIngredients);

    }

    purchaseHandler = () => {
        this.setState({purchasing:true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false})
    } 

    purchaseContinueHandler = () => {
        alert("Continue");
    }
    render () {
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]<=0; 
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
                    <OrderSummary ingredients={this.state.ingredients} 
                        purchaseCancel={this.purchaseCancelHandler} 
                        purchaseContinue={this.purchaseContinueHandler}
                        price={this.state.price}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                addIngredient={this.addIngredientHandler} 
                removeIngredient={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.price}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}/>
                
            </Aux>

            )

    }
    
}

export default BurgerBuilder;