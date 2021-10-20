import React from "react";

import classes from "./MenuButton.module.css";

const MenuButton = props => {
    
    return (
        <React.Fragment>
            <div className={`${classes.menuButton} ${props.thisFocus && classes.active}`} onClick={props.onClick} onMouseOver={props.onHover}>
                {props.children}
            </div>
        </React.Fragment>
    );
};

export default MenuButton;