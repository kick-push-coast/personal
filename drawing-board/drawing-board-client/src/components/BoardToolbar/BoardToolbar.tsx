import { useContext, useEffect, useRef, useState } from "react";
import { LineContextInstance } from "../BoardContainer/BoardContainer";
import { LineDashPicker } from "../LineDashPicker";
import { LineDash } from "../../context/line-context";
import useClickOutside from "../../hooks/use-click-outside";
import lineNoneSvg from "../../assets/line-None.svg";
import lineShortSvg from "../../assets/line-Short.svg";
import lineLongSvg from "../../assets/line-Long.svg";
import classes from './board-toolbar.module.scss';
import { ColorPicker } from "./options/ColorPicker";

export const BoardToolbar = () => {

    const lineContext = useContext(LineContextInstance);
    const registerClickOutside = useClickOutside();

    const widthRef = useRef<HTMLDivElement>(null);
    const dashRef = useRef<HTMLDivElement>(null);

    const [widthOpen, setWidthOpen] = useState(false);
    const [dashOpen, setDashOpen] = useState(false);
    const [lineWidth, setLineWidth] = useState(lineContext.width);

    const lineSvg = (() => {
        switch(lineContext.dashType) {
            case LineDash.none:
                return lineNoneSvg;
            case LineDash.short:
                return lineShortSvg;
            case LineDash.long:
                return lineLongSvg;
        }
    })()

    useEffect(() => {
        widthRef.current && registerClickOutside(widthRef.current, () => setWidthOpen(false));
        dashRef.current && registerClickOutside(dashRef.current, () => setDashOpen(false));
    }, [])

    function handleWidthChange(value: number) {
        lineContext.updateWidth(value);
        setLineWidth(value);
    }

    return (
        <div className={classes.container}>

            <ColorPicker />

            <div ref={widthRef} className={classes.option}>
                <label tabIndex={0} onClick={() => setWidthOpen(!widthOpen)} className={classes.label + (widthOpen ? ' ' + classes.labelOpen : '')}>
                    <div className={classes.widthIconContainer}>
                        <div style={{
                            backgroundColor: '#000',
                            borderRadius: '50%',
                            width: lineWidth,
                            height: lineWidth}}></div>
                    </div>
                    <span>{lineWidth}px</span>
                    
                </label>
                <div className={classes.inputContainer + ' ' + classes.inputContainerRotated + (widthOpen ? ' ' + classes.inputOpen : '')}>
                    <div style={{
                        backgroundColor: '#000',
                        borderRadius: '50%',
                        width: '4px',
                        height: '4px',
                        marginRight: '8px'}}></div>
                    <input id="width-input" className={classes.inputRange} type="range" min="4" max="20" defaultValue={lineContext.width} onInput={(e) => handleWidthChange(parseInt(e.currentTarget.value))} />
                    <div style={{
                        backgroundColor: '#000',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        marginLeft: '8px'}}></div>
                </div>
            </div>

            <div ref={dashRef} className={classes.option}>
                <label tabIndex={0} onClick={() => setDashOpen(!dashOpen)} className={classes.label + (dashOpen ? ' ' + classes.labelOpen : '')}>
                    <img className={classes.dashImg} src={lineSvg} />
                </label>
                <div className={classes.inputContainer + (dashOpen ? ' ' + classes.inputOpen : '')}>
                    <LineDashPicker onSelect={() => setDashOpen(false)} />
                </div>
            </div>
        </div>
    );
};