import { useContext, useEffect, useRef, useState } from "react";
import { LineContextInstance } from "../BoardContainer/BoardContainer";
import { LineDashPicker } from "../LineDashPicker";
import classes from './board-toolbar.module.scss';
import useClickOutside from "../../hooks/use-click-outside";

export const BoardToolbar = () => {

    const widthRef = useRef<HTMLDivElement>(null);
    const dashRef = useRef<HTMLDivElement>(null);

    // let [colorOpen, setColorOpen] = useState(false);
    const [widthOpen, setWidthOpen] = useState(false);
    const [dashOpen, setDashOpen] = useState(false);

    const lineContext = useContext(LineContextInstance);
    const registerClickOutside = useClickOutside();

    useEffect(() => {
        widthRef.current && registerClickOutside(widthRef.current, () => setWidthOpen(false));
        dashRef.current && registerClickOutside(dashRef.current, () => setDashOpen(false));
    }, [])

    return (
        <div className={classes.container}>
            <label className={classes.label}>
                Color
                <input className={classes.inputColor} type="color" defaultValue={lineContext.color} onChange={(e) => lineContext.updateColor(e.target.value)} />
            </label>

            <div ref={widthRef} className={classes.option}>
                <label onClick={() => setWidthOpen(true)} htmlFor="width-input" className={classes.label + (widthOpen ? ' ' + classes.labelOpen : '')}>
                    Width
                </label>
                <div className={classes.inputContainer + ' ' + classes.inputContainerRotated + (widthOpen ? ' ' + classes.inputOpen : '')}>
                    <input id="width-input" className={classes.input} type="range" min="2" max="20" defaultValue={lineContext.width} onChange={(e) => lineContext.updateWidth(parseInt(e.currentTarget.value))} />
                </div>
            </div>

            <div ref={dashRef} className={classes.option}>
                <label onClick={() => setDashOpen(true)} className={classes.label + (dashOpen ? ' ' + classes.labelOpen : '')}>
                    Dash
                </label>
                <div className={classes.inputContainer + (dashOpen ? ' ' + classes.inputOpen : '')}>
                    <LineDashPicker />
                </div>
            </div>
        </div>
    );
};