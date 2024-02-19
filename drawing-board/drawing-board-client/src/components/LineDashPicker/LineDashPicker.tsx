import { useContext } from 'react';
import { LineDash } from '../../context/line-context';
import { LineContextInstance } from '../BoardContainer/BoardContainer';
import classes from './line-dash-picker.module.scss';

export interface LineDashPickerProps { }

export const LineDashPicker = () => {
    const lineContext = useContext(LineContextInstance);

    return (
        <>

            <label className={classes.labelRadio} htmlFor="dash-input-none">
                None
            </label>
            <input
                onChange={(e) => lineContext.updateDash(e.target.value as LineDash)}
                defaultChecked={lineContext.dashType === LineDash.none}
                id="dash-input-none"
                name="dash-inputs"
                type="radio"
                value={LineDash.none} />
            <label className={classes.labelRadio} htmlFor="dash-input-short">
                Short
            </label>
            <input
                onChange={(e) => lineContext.updateDash(e.target.value as LineDash)}
                defaultChecked={lineContext.dashType === LineDash.short}
                id="dash-input-short"
                name="dash-inputs"
                type="radio"
                value={LineDash.short} />
            <label className={classes.labelRadio} htmlFor="dash-input-long">
                Long
            </label>
            <input
                onChange={(e) => lineContext.updateDash(e.target.value as LineDash)}
                defaultChecked={lineContext.dashType === LineDash.long}
                id="dash-input-long"
                name="dash-inputs"
                type="radio"
                value={LineDash.long} />
        </>
    );
};