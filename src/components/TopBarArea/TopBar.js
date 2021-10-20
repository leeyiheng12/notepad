import React from "react";

import globalContext from "../../store/all-context";
import notepadIcon from "../../icons/notepad.png"
import classes from "./TopBar.module.css";
import ButtonsArea from "./ButtonsArea";

const TopBar = props => {

    const ctx = React.useContext(globalContext);

    const [onButtons, setOnButtons] = React.useState(false);

    const disableDragHandler = event => {
        setOnButtons(true);
    }

    const enableDragHandler = event => {
        setOnButtons(false);
    }

    const mainHandler = event => {
        if (onButtons) {
            props.cannotDrag(true);
        } else {
            props.cannotDrag(false);
        }
    };

    const toggleMenuHandler = event => {
        props.toggleMenuFocus(false);
    };

    const onBlurHandler = event => {
        ctx.setFileName(event.target.innerText.replace(/\*/g, ""));
    };

    return (
        <div className={`${props.className} ${classes.topBar}`} onMouseOver={mainHandler} onClick={toggleMenuHandler}>
            <img src={notepadIcon} alt="Notepad Icon" onMouseEnter={disableDragHandler} onMouseLeave={enableDragHandler} onDoubleClick={props.minimise}/>
            <div className={classes.text} onDoubleClick={props.maximise} contentEditable="true" onBlur={onBlurHandler} suppressContentEditableWarning="true">
                {`${ctx.isSaved ? "" : "*"}${ctx.fileName}`}
            </div>
            <ButtonsArea cannotDrag={setOnButtons} minimise={props.minimise} maximise={props.maximise}>
            </ButtonsArea>
        </div>
    );
};

export default TopBar;