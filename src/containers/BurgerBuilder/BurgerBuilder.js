import React, {Component} from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENTS_PRICE = {
    salad: 1, cheese: 0.5, meat: 2, bacon: 1.5
}
class BurgerBuilder extends Component {

    state = {
        ingredients : null,
        purchasable: false,
        purchasing: false,
        price: 4, 
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://burger-app-c692d.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            }).catch(err => {this.setState({error: true})})
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
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.price,
            customer: {
                name: 'Shea Coulee',
                city: 'Chicago',
                email: 'sheacoulee@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order).then(response => this.setState({loading: false, purschasing: false}))
            .catch(error => this.setState({loading: false, purschasing: false}));
    }
    render () {
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]<=0; 
        }
        let orderSummary= null;

        let burger = this.state.error ? <p>The ingredients cannot be loaded </p> : <Spinner/> 
        
        if (this.state.ingredients){
            burger = (
                <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                addIngredient={this.addIngredientHandler} 
                removeIngredient={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.price}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}/>
                </Aux>
                );
            orderSummary = (<OrderSummary ingredients={this.state.ingredients} 
            purchaseCancel={this.purchaseCancelHandler} 
            purchaseContinue={this.purchaseContinueHandler}
            price={this.state.price}/>);
        }
        if (this.state.loading) {
            orderSummary = <Spinner/>
        }
        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>

            )

    }
    
}

export default withErrorHandler(BurgerBuilder,axios);