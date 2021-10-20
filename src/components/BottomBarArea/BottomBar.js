import React from "react";

import classes from "./BottomBar.module.css";
import BottomSection from "./BottomSection";

const BottomBar = props => {

    const lineColStyle = {width: "139px", flexShrink: 1000};
    const percentageStyle = {width: "49px", flexShrink: 100};
    const windowsStyle = {width: "119px", flexShrink: 10};
    const encodingStyle = {width: "119px", flexShrink: 0};

    return (
        <div className={classes.bottomBar}>
            <BottomSection style={encodingStyle}>UTF-8</BottomSection>
            <BottomSection style={windowsStyle}>Windows (CRLF)</BottomSection>
            <BottomSection style={percentageStyle}>100%</BottomSection>
            <BottomSection style={lineColStyle}><span>&nbsp;</span>{`Ln ${props.position.line}, Col ${props.position.col}`}</BottomSection>
        </div>
    );
};

export default BottomBar;