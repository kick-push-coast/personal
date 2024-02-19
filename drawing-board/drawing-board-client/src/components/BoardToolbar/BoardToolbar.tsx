import { useContext, useState } from "react";
import { LineContextInstance } from "../BoardContainer/BoardContainer";
import classes from './board-toolbar.module.scss';
import { LineDash } from "../../context/line-context";

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
            <label className={classes.label}>
                Color
                <input className={classes.inputColor} type="color" defaultValue={lineContext.color} onChange={(e) => lineContext.updateColor(e.target.value)} />
            </label>
            <div className={classes.option}>
                <label htmlFor="width-input" onClick={toggleWidth} className={classes.label + (widthOpen ? ' ' + classes.labelOpen : '')}>
                    Width
                </label>
                <div className={classes.inputContainer + ' ' + classes.inputContainerRotated + (widthOpen ? ' ' + classes.inputOpen : '')}>
                    <input id="width-input" className={classes.input} type="range" min="2" max="20" defaultValue={lineContext.width} onChange={(e) => lineContext.updateWidth(parseInt(e.currentTarget.value))} />
                </div>
            </div>
            <div className={classes.option}>
                <label onClick={toggleDash} className={classes.label + (dashOpen ? ' ' + classes.labelOpen : '')}>
                    Dash
                </label>
                <div className={classes.inputContainer + (dashOpen ? ' ' + classes.inputOpen : '')}>
                        <label className={classes.labelRadio} htmlFor="dash-input-none">
                            None
                        </label>
                        <input
                            onChange={(e) => lineContext.updateDash(e.target.value as LineDash)}
                            defaultChecked={lineContext.dashType === LineDash.none}
                            id="dash-input-none"
                            name="dash-inputs"
                            type="radio"
                            value={LineDash.none}/>
                        <label className={classes.labelRadio} htmlFor="dash-input-short">
                            Short
                        </label>
                        <input
                            onChange={(e) => lineContext.updateDash(e.target.value as LineDash)}
                            defaultChecked={lineContext.dashType === LineDash.short}
                            id="dash-input-short"
                            name="dash-inputs"
                            type="radio"
                            value={LineDash.short}/>
                        <label className={classes.labelRadio} htmlFor="dash-input-long">
                            Long
                        </label>
                        <input
                            onChange={(e) => lineContext.updateDash(e.target.value as LineDash)}
                            defaultChecked={lineContext.dashType === LineDash.long}
                            id="dash-input-long"
                            name="dash-inputs"
                            type="radio"
                            value={LineDash.long}/>
                </div>
            </div>
        </div>
    );
};