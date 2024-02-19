import { useContext } from 'react';
import { LineDash } from '../../context/line-context';
import { LineContextInstance } from '../BoardContainer/BoardContainer';
import lineNoneSvg from "../../assets/line-None.svg";
import lineShortSvg from "../../assets/line-Short.svg";
import lineLongSvg from "../../assets/line-Long.svg";
import classes from './line-dash-picker.module.scss';

export interface LineDashPickerProps { }

export const LineDashPicker = () => {
    const lineContext = useContext(LineContextInstance);

    return (
        <>
            <input
                onChange={(e) => lineContext.updateDash(e.target.value as LineDash)}
                defaultChecked={lineContext.dashType === LineDash.none}
                className={classes.input}
                id="dash-input-none"
                name="dash-inputs"
                type="radio"
                value={LineDash.none} />
            <label className={classes.labelRadio} htmlFor="dash-input-none">
                <img src={lineNoneSvg}/>
            </label>
            <input
                onChange={(e) => lineContext.updateDash(e.target.value as LineDash)}
                defaultChecked={lineContext.dashType === LineDash.short}
                className={classes.input}
                id="dash-input-short"
                name="dash-inputs"
                type="radio"
                value={LineDash.short} />
            <label className={classes.labelRadio} htmlFor="dash-input-short">
                <img src={lineShortSvg}/>
            </label>
            <input
                onChange={(e) => lineContext.updateDash(e.target.value as LineDash)}
                defaultChecked={lineContext.dashType === LineDash.long}
                className={classes.input}
                id="dash-input-long"
                name="dash-inputs"
                type="radio"
                value={LineDash.long} />
            <label className={classes.labelRadio} htmlFor="dash-input-long">
                <img src={lineLongSvg}/>
            </label>
        </>
    );
};