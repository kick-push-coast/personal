// import { useContext } from "react";
// import { LineContextInstance } from "../BoardContainer/BoardContainer";
import { useState } from 'react';
import classes from './board-toolbar.module.scss';

export const BoardToolbar = () => {

    // let [colorOpen, setColorOpen] = useState(false);
    let [widthOpen, setWidthOpen] = useState(false);
    let [dashOpen, setDashOpen] = useState(false);

    // let lineContext = useContext(LineContextInstance);

    function toggleWidth() {
        if (widthOpen) {
            setWidthOpen(false);
        } else {
            setWidthOpen(true);
            setDashOpen(false);
        }
    }

    function toggleDash() {
        if (dashOpen) {
            setDashOpen(false);
        } else {
            setDashOpen(true);
            setWidthOpen(false);
        }
    }
	
	return (
		<div className={classes.container}>
            <button className={classes.button}>
                Color
            </button>
            <div className={classes.option}>
                <button onClick={toggleWidth} className={classes.button}>
                    Width
                </button>
                <div className={classes.input + (widthOpen ? ' ' + classes.inputOpen : '')}>
                </div>
            </div>
            <div className={classes.option}>
                <button onClick={toggleDash} className={classes.button}>
                    Dash
                </button>
                <div className={classes.input + (dashOpen ? ' ' + classes.inputOpen : '')}>
                </div>
            </div>
        </div>
	);
};