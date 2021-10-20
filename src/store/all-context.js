import React from "react";

const globalContext = React.createContext({
    textOnFocus: false,
    menuOnFocus: false,
    isSaved: true,
    setIsSaved: x => "",
    savedContent: "",
    setSavedContent: x => "",
    isMaximised: false,
    loadFromFile: false,
    highlighted: "",
    setHighlighted: x => "",
    textareaRef: null,
    setTextareaRef: x => "",
    fileName: "",
    setFileName: x => ""
});

export default globalContext;