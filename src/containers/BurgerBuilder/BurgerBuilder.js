import React, {Component} from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
class BurgerBuilder extends Component {

    state = {
        ingredients : {
            bacon: 1,
            meat: 1,
            cheese: 1,
            salad: 1
        }
    }

    render () {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <div> Builder Control</div>
            </Aux>

            )

    }
    
}

export default BurgerBuilder;