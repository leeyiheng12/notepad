import React from "react";

import globalContext from "../../store/all-context";
import classes from "./TypeableArea.module.css";

function download(filename, text) {
    let blob = new Blob([text], {type: "text/plain"});
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
}

const letterToKeyCode = {
    "N": 78,
    "S": 83,
    "F": 70,
    "O": 79,
    "R": 82,
    "M": 77
};

const TypeableArea = props => {

    const ctx = React.useContext(globalContext);

    const ref = React.useRef();
    ctx.setTextareaRef(ref);

    const propsActions = props.action;
    const slff = props.setLoadFromFile;
    const psa = props.setAction;
    const psp = props.setPosition;

    const getPosition = React.useCallback(() => {
        const text = ref.current.value.slice(0, ref.current.selectionStart);
        const line = text.split("\n").length;
        const col = text.split("\n").pop().length + 1;
        psp({line: line, col: col});
    }, [psp]);

    const changeTextHandler = event => {
        getPosition();
        if (event.target.value === ctx.savedContent) {
            ctx.setIsSaved(true);
        } else {
            ctx.setIsSaved(false);
        }
    };

    const typeableHandler = event => {
        getPosition();
        props.toggleTextFocus(true);
        props.toggleMenuFocus(false);
    };

    const saveToCtx = React.useCallback(text => {
        ctx.setIsSaved(true);
        ctx.setSavedContent(text);
    }, [ctx]);


    const openFile = React.useCallback(() => {
        const inputE = document.createElement("input");
        inputE.type = "file";
        inputE.onchange = e => {
            if (e.target.files[0].size <= 2500000) {
                const reader = new FileReader();
                reader.onload = ee => { saveToCtx(ee.target.result); slff(true); getPosition();};
                reader.readAsText(e.target.files[0], "UTF-8");
            } else {
                alert("File size kinda big, I'm not risking it");
            }
        };
        inputE.dispatchEvent(new MouseEvent("click"));
    }, [saveToCtx, slff, getPosition]);

    const keyPressHandler = event => {
        if (event.ctrlKey && event.keyCode === letterToKeyCode.M) {  // Ctrl+M New
            event.preventDefault();
            ref.current.value = "";
            saveToCtx("");
            props.setLoadFromFile(true);
        }
        if (event.ctrlKey && event.keyCode === letterToKeyCode.O) {  // Ctrl+O Open
            event.preventDefault();
            openFile();
        }
        if (event.ctrlKey && event.shiftKey && event.keyCode === letterToKeyCode.S) { // Ctrl+Shift+S Save As (Download)
            event.preventDefault();
            saveToCtx(event.target.value);
            if (ctx.fileName.includes(".")) {
                download(ctx.fileName, event.target.value);
            } else {
                download(ctx.fileName + ".txt", event.target.value);
            }
        } 
        if (event.ctrlKey && event.keyCode === letterToKeyCode.S) {  // Ctrl+S Save
            event.preventDefault();
            saveToCtx(event.target.value);
        }
        if (event.ctrlKey && event.keyCode === letterToKeyCode.W) {
            event.preventDefault();
        }
    };
    
    React.useEffect(() => {
        psa("");
        if (propsActions === "New") {
            ref.current.value = "";
            saveToCtx("");
            slff(true);
        }
        if (propsActions === "Open") {
            openFile();
        }
        if (propsActions === "Save") {
            saveToCtx(ref.current.value);
        }
        if (propsActions === "Save As") {
            saveToCtx(ref.current.value);
            download("textasd.txt", ref.current.value);
        }
        if (propsActions === "Undo") {
            document.execCommand("undo");
        }
        if (propsActions === "Cut") {
            ref.current.value = ref.current.value.replace(ctx.highlighted, "");
            navigator.clipboard.writeText(ctx.highlighted);
        }
        if (propsActions === "Copy") {
            navigator.clipboard.writeText(ctx.highlighted);
        }
        if (propsActions === "Paste") {
            const [start, end] = [ref.current.selectionStart, ref.current.selectionEnd];
            navigator.clipboard.readText().then(
                txt => ref.current.setRangeText(txt, start, end)
            );
        }
        if (propsActions === "Delete") {
            const [start, end] = [ref.current.selectionStart, ref.current.selectionEnd];
            ref.current.setRangeText("", start, end);
        }
        if (propsActions === "Select All") {
            ref.current.select();
        }
    }, [psa, propsActions, slff, saveToCtx, openFile, ctx.highlighted]);

    React.useEffect(() => {
        if (ctx.loadFromFile) {
            ref.current.value = ctx.savedContent;
            // slff(false);
        }
    }, [ctx.loadFromFile, ctx.savedContent]);

    // event => {ctx.setHighlighted(window.getSelection().toString())}

    return (
        <textarea
        spellCheck="false"
        className={classes.typeableArea} 
        onInput={changeTextHandler} 
        onClick={typeableHandler}
        onKeyDown={keyPressHandler}
        suppressContentEditableWarning="true"
        ref={ref}>
        </textarea>
    );
};

export default TypeableArea;