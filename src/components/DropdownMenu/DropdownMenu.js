import React from "react";

import classes from "./DropdownMenu.module.css";

const DropdownMenu = props => {

    const optionsJSX = props.chars.options.map(option => {
        if ("l" in option) {
            return (<div className={classes.individualOption} key={Math.random()} onClick={option.onClick}>
                <div className={`${classes.leftText} ${option.disabled && classes.fontDisabled}`}>{option.l}</div>
                <div className={`${classes.rightText} ${option.disabled && classes.fontDisabled}`}>{option.r}</div>
                </div>);
        } else if ("empty" in option) {
            return (<div className={classes.straightLine} key={Math.random()} />);
        } else {
            return (<div className={classes.closing} key={Math.random()} />);
        }
    });

    const divStyle = {
        position: "relative",
        top: "-2px",
        left: props.chars.xCoord,
        width: props.chars.width,
        opacity: 1
    };

    return (
        <div style={divStyle} className={classes.dropdownMenu}>
            {optionsJSX}
        </div>
    );
};

export default DropdownMenu;