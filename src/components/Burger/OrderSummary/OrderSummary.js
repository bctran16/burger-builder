import React from 'react'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
        return <li key={igKey}> <span style={{textTransform:'capitalize'}}> {igKey}</span>: {props.ingredients[igKey]}</li>
        })

    return (
        <div> 
            <h3>Order Summary</h3>
            <p> Ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p> Continue to Checkout</p>
            <Button btnType="Danger" clicked={props.purchaseCancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </div>
    )

}

export default orderSummary