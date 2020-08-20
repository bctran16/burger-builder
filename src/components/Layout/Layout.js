import React, {Component}from 'react'
import Aux from '../../hoc/Aux'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'


class Layout extends Component { 
    state = {
        showSidedrawer: false
    }
    sideDrawerCloseHandler = () => 
    {
        this.setState({showSidedrawer: false})
    }

    sideDrawerOpenHandler = () => {
        this.setState({showSidedrawer: true})
    }
    render () {
        return ( <Aux>
            <SideDrawer  open={this.state.showSidedrawer} closed={this.sideDrawerCloseHandler}/>
            <Toolbar opened={this.sideDrawerOpenHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        )
    }

}
export default Layout; 