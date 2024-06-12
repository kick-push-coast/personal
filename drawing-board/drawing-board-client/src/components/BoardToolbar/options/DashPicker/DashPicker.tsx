import { useContext, useRef, useState, useEffect } from 'react';
import { LineDash } from '../../../../context/line-context';
import { LineContextInstance } from '../../../BoardContainer/BoardContainer';
import { LineDashPicker } from './LineDashPicker';
import useClickOutside from '../../../../hooks/use-click-outside';
import lineNoneSvg from "../../../../assets/line-None.svg";
import lineShortSvg from "../../../../assets/line-Short.svg";
import lineLongSvg from "../../../../assets/line-Long.svg";
import classes from '../../board-toolbar.module.scss';

export const DashPicker = () => {

    const lineContext = useContext(LineContextInstance);
    const registerClickOutside = useClickOutside();

    const dashRef = useRef<HTMLDivElement>(null);

    const [dashOpen, setDashOpen] = useState(false);

    const lineSvg = (() => {
        switch (lineContext.dashType) {
            case LineDash.none:
                return lineNoneSvg;
            case LineDash.short:
                return lineShortSvg;
            case LineDash.long:
                return lineLongSvg;
        }
    })()

    useEffect(() => {
        dashRef.current && registerClickOutside(dashRef.current, () => setDashOpen(false));
    }, [])

    return (
        <div ref={dashRef} className={classes.option}>
            <label
                title="Line type"
                tabIndex={0}
                onClick={() => setDashOpen(!dashOpen)}
                onKeyDown={(e) => (e.key === 'Enter') && setDashOpen(!dashOpen)}
                className={classes.label + (dashOpen ? ' ' + classes.labelOpen : '')}
                role="button"
                aria-haspopup="true"
                aria-expanded={dashOpen}
                aria-controls="dash-picker">
                <img alt="Line type icon" className={classes.dashImg} src={lineSvg} />
            </label>
            <div id="dash-picker" className={classes.inputContainer + (dashOpen ? ' ' + classes.inputOpen : '')}>
                <LineDashPicker onSelect={() => setDashOpen(false)} />
            </div>
        </div>
    );
};