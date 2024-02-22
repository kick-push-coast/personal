import { MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { LineContextInstance } from "../BoardContainer/BoardContainer";
import { LineDashPicker } from "../LineDashPicker";
import { LineDash } from "../../context/line-context";
import useClickOutside from "../../hooks/use-click-outside";
import lineNoneSvg from "../../assets/line-None.svg";
import lineShortSvg from "../../assets/line-Short.svg";
import lineLongSvg from "../../assets/line-Long.svg";
import classes from './board-toolbar.module.scss';

export const BoardToolbar = () => {

    const lineContext = useContext(LineContextInstance);
    const registerClickOutside = useClickOutside();

    const colorRef = useRef<HTMLDivElement>(null);
    const widthRef = useRef<HTMLDivElement>(null);
    const dashRef = useRef<HTMLDivElement>(null);

    const [colorOpen, setColorOpen] = useState(false);
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
        colorRef.current && registerClickOutside(colorRef.current, () => setColorOpen(false));
        widthRef.current && registerClickOutside(widthRef.current, () => {setWidthOpen(false)});
        dashRef.current && registerClickOutside(dashRef.current, () => setDashOpen(false));
    }, [])

    function handleColorClick(e: MouseEvent) {
        console.log(e.target);
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

    function handleWidthChange(value: number) {
        lineContext.updateWidth(value);
        setLineWidth(value);
    }

    return (
        <div className={classes.container}>
            <div ref={colorRef}>
                <label tabIndex={0} onClick={handleColorClick} className={classes.label + (colorOpen ? ' ' + classes.labelOpen : '')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48">
                        <path fill={lineContext.color} d="M24 6c-9.94 0-18 8.06-18 18s8.06 18 18 18c1.66 0 3-1.34 3-3 0-.78-.29-1.48-.78-2.01-.47-.53-.75-1.22-.75-1.99 0-1.66 1.34-3 3-3h3.53c5.52 0 10-4.48 10-10 0-8.84-8.06-16-18-16zm-11 18c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm6-8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm10 0c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm6 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                        <path fill="none" d="M0 0h48v48h-48z"/>
                    </svg>
                    <input className={classes.inputColor} type="color" defaultValue={lineContext.color} onInput={(e) => lineContext.updateColor(e.currentTarget.value)} />
                </label>
            </div>

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