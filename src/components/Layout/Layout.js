import React from 'react'
import Aux from '../../hoc/Aux'
import classes from './Layout.module.css'


const layout = (props) => (
    <Aux>
        <div className={classes.Content}> ToolBar, SideDrawer, Backdrop</div>
        <main>
            {props.children}
        </main>
    </Aux>

);

export default layout; 