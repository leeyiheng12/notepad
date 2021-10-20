import React from "react";

import globalContext from "../../store/all-context";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import MenuButton from "./MenuButton";
import classes from "./MenuBar.module.css";

const initState = {
    options: []
};


const MenuBar = props => {

    const ctx = React.useContext(globalContext);
    
    const sendAction = text => {
        props.toggleMenuFocus(false);
        props.setAction(text);
    };

    const fileOptions = [{l: "New", r: "Ctrl+M", disabled: false, onClick: () => {sendAction("New");}}, 
        {l: "New Window", r: "Ctrl+Shift+N", disabled: true},
        {l: "Open...", r: "Ctrl+O", disabled: false, onClick: () => {sendAction("Open");}}, 
        {l: "Save", r: "Ctrl+S", disabled: false, onClick: () => {sendAction("Save");}}, 
        {l: "Save As...", r: "Ctrl+Shift+S", disabled: false, onClick: () => {sendAction("Save As");}}, 
        {empty: true}, 
        {l: "Page Setup...", r: "", disabled: true},
        {l: "Print...", r: "Ctrl+P", disabled: true}, 
        {empty: true}, 
        {l: "Exit", r: "", disabled: true}, 
        {end: true}];

    const editOptions = [{l: "Undo", r: "Ctrl+Z", disabled: false, onClick: () => {sendAction("Undo")}},  
        {empty: true}, 
        {l: "Cut", r: "Ctrl+X", disabled: false, onClick: () => {sendAction("Cut")}},  
        {l: "Copy", r: "Ctrl+C", disabled: false, onClick: () => {sendAction("Copy")}},     
        {l: "Paste", r: "Ctrl+V", disabled: false, onClick: () => {sendAction("Paste")}},   
        {l: "Delete", r: "Del", disabled: false, onClick: () => {sendAction("Delete")}}, 
        {empty: true}, 
        {l: "Find...", r: "Ctrl+F", disabled: true}, 
        {l: "Find Next", r: "Ctrl+F3", disabled: true}, 
        {l: "Find Previous", r: "Shift+F3", disabled: true},
        {l: "Replace...", r: "Ctrl+H", disabled: true}, 
        {l: "Go To...", r: "Ctrl+G", disabled: true}, {empty: true}, 
        {l: "Select All", r: "Ctrl+A", disabled: false, onClick: () => {sendAction("Select All")}}, 
        {l: "Time/Date", r: "F5", disabled: true}, {end: true}];

    // const iconOptions = [];

    const reducerFn = (prevState, action) => {
        if (action === "OPEN_FILE") {
            return {
                xCoord: 0,
                options: fileOptions,
                width: 227
            };
        } else if (action === "OPEN_EDIT") {
            return {
                xCoord: 33,
                options: editOptions,
                width: 229
            };
        } else if (action === "CLOSE") {
            return {
            };
        }
    };


    const [dropdownState, dropdownStateDispatch] = React.useReducer(reducerFn, initState);
    const [fileFocus, setFileFocus] = React.useState(false);
    const [editFocus, setEditFocus] = React.useState(false);

    React.useEffect(() => {
        if (!ctx.menuOnFocus) {
            setFileFocus(false);
            setEditFocus(false);
        }
    }, [ctx.menuOnFocus]);

    React.useEffect(() => {
        dropdownStateDispatch("CLOSE");
    }, [props.focusType]);


    const fileHoverHandler = event => {
        if (ctx.menuOnFocus) {
            dropdownStateDispatch("OPEN_FILE");
            setFileFocus(true);
            setEditFocus(false);
        }
    };

    const editHoverHandler = event => {
        if (ctx.menuOnFocus) {
            dropdownStateDispatch("OPEN_EDIT");
            setEditFocus(true);
            setFileFocus(false);
        }
    };

    const fileClickHandler = event => {
        props.toggleTextFocus(false);
        if (ctx.menuOnFocus) {
            dropdownStateDispatch("CLOSE");
            props.toggleMenuFocus(false);
            setFileFocus(false);
        } else {
            dropdownStateDispatch("OPEN_FILE");
            props.toggleMenuFocus(true);
            setFileFocus(true);
        }
    };


    const editClickHandler = event => {
        ctx.textareaRef.current.focus();
        ctx.setHighlighted(document.getSelection().toString());
        props.toggleTextFocus(false);
        if (ctx.menuOnFocus) {
            dropdownStateDispatch("CLOSE");
            props.toggleMenuFocus(false);
            setEditFocus(false);
        } else {
            dropdownStateDispatch("OPEN_EDIT");
            props.toggleMenuFocus(true);
            setEditFocus(true);
        }
    };


    const otherHoverHandler = event => {
        dropdownStateDispatch("CLOSE");
        props.toggleMenuFocus(false);
    };



    return (
        <div className={classes.menuBar}>
            <MenuButton onClick={fileClickHandler} onHover={fileHoverHandler} thisFocus={fileFocus}><u>F</u>ile</MenuButton>
            <MenuButton onClick={editClickHandler} onHover={editHoverHandler} thisFocus={editFocus}><u>E</u>dit</MenuButton>
            <MenuButton onHover={otherHoverHandler} >F<u>o</u>rmat</MenuButton>
            <MenuButton onHover={otherHoverHandler} ><u>V</u>iew</MenuButton>
            <MenuButton onHover={otherHoverHandler} ><u>H</u>elp</MenuButton>
            {ctx.menuOnFocus && <DropdownMenu chars={dropdownState}/>}
        </div>
    );
};

export default MenuBar;