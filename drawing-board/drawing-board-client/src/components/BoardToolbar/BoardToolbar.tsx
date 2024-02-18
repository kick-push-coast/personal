import { useContext, useState } from "react";
import { LineContextInstance } from "../BoardContainer/BoardContainer";
import classes from './board-toolbar.module.scss';

export const BoardToolbar = () => {

    // let [colorOpen, setColorOpen] = useState(false);
    let [widthOpen, setWidthOpen] = useState(false);
    let [dashOpen, setDashOpen] = useState(false);

    let lineContext = useContext(LineContextInstance);

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
                <label htmlFor="width-input" onClick={toggleWidth} className={classes.button + (widthOpen ? ' ' + classes.buttonOpen : '')}>
                    Width
                </label>
                <div className={classes.inputContainer + (widthOpen ? ' ' + classes.inputOpen : '')}>
                    <input id="width-input" className={classes.input} type="range" min="2" max="20" defaultValue={lineContext.width} onChange={(e) => lineContext.updateWidth(parseInt(e.currentTarget.value))} />
                </div>
            </div>
            <div className={classes.option}>
                <button onClick={toggleDash} className={classes.button + (dashOpen ? ' ' + classes.buttonOpen : '')}>
                    Dash
                </button>
                <div className={classes.inputContainer + (dashOpen ? ' ' + classes.inputOpen : '')}>
                </div>
            </div>
        </div>
    );
};