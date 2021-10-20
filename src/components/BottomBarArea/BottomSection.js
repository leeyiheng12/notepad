import React from "react";

import classes from "./BottomSection.module.css";

const BottomSection = props => {

    return (
        
        <div 
            className={classes.bottomSection}
            style={props.style} >
            <span>&nbsp;&nbsp;</span>
            {props.children}
        </div>
    );
};

export default BottomSection;