import React from "react";

import globalContext from "../../store/all-context";
import classes from "./ButtonsArea.module.css";

import minimise from "../../icons/minimise.png"
import maximise from "../../icons/maximise.png"
import unmaximise from "../../icons/unmaximise.png"
import close from "../../icons/close.png"

import minimise_hover from "../../icons/minimise_hover.png"
import maximise_hover from "../../icons/maximise_hover.png"
import unmaximise_hover from "../../icons/unmaximise_hover.png"
import close_hover from "../../icons/close_hover.png"

const ButtonsArea = props => {

    const ctx = React.useContext(globalContext);

    const disableDragHandler = event => {
        props.cannotDrag(true);
    };

    const enableDragHandler = event => {
        props.cannotDrag(false);
    };

    const hoverMinimiseHandler = event => {
        event.target.src = minimise_hover;
    };

    const unhoverMinimiseHandler = event => {
        event.target.src = minimise;
    };
 
    const hoverMaximiseHandler = event => {
        event.target.src = maximise_hover;
    };

    const unhoverMaximiseHandler = event => {
        event.target.src = maximise;
    }; 

    const hoverUnmaximiseHandler = event => {
        event.target.src = unmaximise_hover;
    };

    const unhoverUnmaximiseHandler = event => {
        event.target.src = unmaximise;
    };

    const hoverCloseHandler = event => {
        event.target.src = close_hover;
    };

    const unhoverCloseHandler = event => {
        event.target.src = close;
    };

    const minMaxButton = ctx.isMaximised
        ? (<img src={unmaximise} alt="unfullscreen" className={classes.button} onMouseEnter={hoverUnmaximiseHandler} onMouseLeave={unhoverUnmaximiseHandler} onClick={props.maximise} />)
        : (<img src={maximise} alt="fullscreen" className={classes.button} onMouseEnter={hoverMaximiseHandler} onMouseLeave={unhoverMaximiseHandler} onClick={props.maximise} />);

    return (
        <div className={classes.mainArea} onMouseEnter={disableDragHandler} onMouseLeave={enableDragHandler}>
            <img src={minimise} alt="minimise" 
                className={classes.button} 
                onMouseEnter={hoverMinimiseHandler} 
                onMouseLeave={unhoverMinimiseHandler} 
                onClick={props.minimise} />
            {minMaxButton}
            <img src={close} alt="close" className={classes.button} onMouseEnter={hoverCloseHandler} onMouseLeave={unhoverCloseHandler} onClick={props.minimise}/>
        </div>
    );
};

export default ButtonsArea;