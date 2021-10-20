import React from "react";
import Draggable from "react-draggable";

import globalContext from "../store/all-context";
import classes from "./MainWindow.module.css";
import TopBar from "./TopBarArea/TopBar";
import MenuBar from "./MenuButtonsArea/MenuBar";
import TypeableArea from "./TypeableArea/TypeableArea";
import BottomBar from "./BottomBarArea/BottomBar";

const MainWindow = props => {

    const [cannotDrag, setCannotDrag] = React.useState(false);

    const [typeableAreaFocus, setTypeableAreaFocus] = React.useState(false);
    const [menuBarFocus, setmenuBarFocus] = React.useState(false);

    const [isSaved, setIsSaved] = React.useState(true);

    const defaultString = localStorage.getItem("notepad.exe");
    const [savedContent, setSavedContent] = React.useState(defaultString === null ? "" : defaultString);

    const [isMinimised, setIsMinimised] = React.useState(false);
    const [isMaximised, setIsMaximised] = React.useState(false);

    React.useEffect(() => {
        localStorage.setItem("notepad.exe", savedContent);
    }, [savedContent]);

    const minimiseHandler = event => {
        setIsMinimised(true);
    };

    const maximiseHandler = event => {
        setIsMaximised(prev => !prev);
    };

    const [action, setAction] = React.useState("");

    const [loadFromFile, setLoadFromFile] = React.useState(defaultString !== null);
    
    const [highlighted, setHighlighted] = React.useState("");

    const [textareaRef, setTextareaRef] = React.useState();

    const [fileName, setFileName] = React.useState("Untitled - Notepad");

    const [position, setPosition] = React.useState({line: 0, col: 0});

    const dragFileHandler = event => {
        if (event.dataTransfer.files.length === 1) {
            event.preventDefault();
            const file = event.dataTransfer.files[0];
            if (file.size <= 2500000) {
                setFileName(file.name);            
                const reader = new FileReader();
                reader.onload = ee => { setSavedContent(ee.target.result); setIsSaved(true); setLoadFromFile(true);};
                reader.readAsText(file, "UTF-8");
            } else {
                alert("File size kinda big, I'm not risking it");
            }
        }
    };

    return (
        <globalContext.Provider value={{textOnFocus: typeableAreaFocus, 
            menuOnFocus: menuBarFocus, 
            isSaved: isSaved, 
            setIsSaved: setIsSaved,
            savedContent: savedContent,
            setSavedContent: setSavedContent,
            isMaximised: isMaximised,
            loadFromFile: loadFromFile,
            highlighted: highlighted,
            setHighlighted: setHighlighted,
            textareaRef: textareaRef,
            setTextareaRef: setTextareaRef,
            fileName: fileName,
            setFileName: setFileName}}>
            <Draggable 
                handle=".handle"
                defaultPosition={{x: 400, y: 100}}
                disabled={cannotDrag}>
            <div className={`${isMaximised && classes.maximised} ${isMinimised && classes.hidden} ${classes.mainWindow}`} onDrop={dragFileHandler}> 
                <TopBar 
                    className="handle" 
                    cannotDrag={setCannotDrag} 
                    toggleMenuFocus={setmenuBarFocus} 
                    minimise={minimiseHandler} 
                    maximise={maximiseHandler} />
                <MenuBar 
                    toggleTextFocus={setTypeableAreaFocus} 
                    toggleMenuFocus={setmenuBarFocus} 
                    setAction={setAction} />
                <TypeableArea 
                    toggleTextFocus={setTypeableAreaFocus} 
                    toggleMenuFocus={setmenuBarFocus} 
                    action={action} 
                    setAction={setAction} 
                    setLoadFromFile={setLoadFromFile} 
                    setPosition={setPosition} />
                <BottomBar toggleMenuFocus={setmenuBarFocus} position={position}></BottomBar>
            </div>
            </Draggable>
        </globalContext.Provider>
    );
};

export default MainWindow;