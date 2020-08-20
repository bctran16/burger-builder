import React from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import BackDrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux'
const sideDrawer = (props) => {
    let attachedSidedrawer = [classes.SideDrawer, classes.Close]
    if (props.open) {
        attachedSidedrawer = [classes.SideDrawer, classes.Open]
    }
    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachedSidedrawer.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>

        </Aux>

    )
}

export default sideDrawer; 