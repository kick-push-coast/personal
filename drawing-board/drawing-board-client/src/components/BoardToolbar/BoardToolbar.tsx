import { MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { LineContextInstance } from "../BoardContainer/BoardContainer";
import { LineDashPicker } from "../LineDashPicker";
import useClickOutside from "../../hooks/use-click-outside";
import classes from './board-toolbar.module.scss';

export const BoardToolbar = () => {

    const colorRef = useRef<HTMLDivElement>(null);
    const widthRef = useRef<HTMLDivElement>(null);
    const dashRef = useRef<HTMLDivElement>(null);

    const [colorOpen, setColorOpen] = useState(false);
    const [widthOpen, setWidthOpen] = useState(false);
    const [dashOpen, setDashOpen] = useState(false);

    const lineContext = useContext(LineContextInstance);
    const registerClickOutside = useClickOutside();

    function handleColorClick(e: MouseEvent) {
        if (e.target instanceof HTMLElement && e.target.nodeName === 'INPUT') {
            return;
        }
        if (colorOpen === false) {
            setColorOpen(true);
        } else {
            e.preventDefault();
            setColorOpen(false);
        }
    }

    useEffect(() => {
        colorRef.current && registerClickOutside(colorRef.current, () => setColorOpen(false));
        widthRef.current && registerClickOutside(widthRef.current, () => setWidthOpen(false));
        dashRef.current && registerClickOutside(dashRef.current, () => setDashOpen(false));
    }, [])

    return (
        <div className={classes.container}>
            <div ref={colorRef}>
                <label tabIndex={0} onClick={handleColorClick} className={classes.label + (colorOpen ? ' ' + classes.labelOpen : '')}>
                    Color
                    <input className={classes.inputColor} type="color" defaultValue={lineContext.color} onChange={(e) => lineContext.updateColor(e.target.value)} />
                </label>
            </div>

            <div ref={widthRef} className={classes.option}>
                <label tabIndex={0} onClick={() => setWidthOpen(!widthOpen)} className={classes.label + (widthOpen ? ' ' + classes.labelOpen : '')}>
                    Width
                </label>
                <div className={classes.inputContainer + ' ' + classes.inputContainerRotated + (widthOpen ? ' ' + classes.inputOpen : '')}>
                    <input id="width-input" className={classes.input} type="range" min="2" max="20" defaultValue={lineContext.width} onChange={(e) => lineContext.updateWidth(parseInt(e.currentTarget.value))} />
                </div>
            </div>

            <div ref={dashRef} className={classes.option}>
                <label tabIndex={0} onClick={() => setDashOpen(!dashOpen)} className={classes.label + (dashOpen ? ' ' + classes.labelOpen : '')}>
                    Dash
                </label>
                <div className={classes.inputContainer + (dashOpen ? ' ' + classes.inputOpen : '')}>
                    <LineDashPicker />
                </div>
            </div>
        </div>
    );
};