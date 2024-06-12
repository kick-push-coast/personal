import { useContext, useEffect, useRef, useState } from 'react';
import { LineContextInstance } from '../../../BoardContainer/BoardContainer';
import useClickOutside from '../../../../hooks/use-click-outside';
import classes from '../../board-toolbar.module.scss';

export const WidthPicker = () => {

    const lineContext = useContext(LineContextInstance);
    const registerClickOutside = useClickOutside();

    const widthRef = useRef<HTMLDivElement>(null);
    const [widthOpen, setWidthOpen] = useState(false);
    const [lineWidth, setLineWidth] = useState(lineContext.width);

    useEffect(() => {
        widthRef.current && registerClickOutside(widthRef.current, () => setWidthOpen(false));
    }, [])

    function handleWidthChange(value: number) {
        lineContext.updateWidth(value);
        setLineWidth(value);
    }

    return (
        <div ref={widthRef} className={classes.option}>
            <label
                title="Line width"
                tabIndex={0}
                onClick={() => setWidthOpen(!widthOpen)}
                onKeyDown={(e) => (e.key === 'Enter') && setWidthOpen(!widthOpen)}
                className={classes.label + (widthOpen ? ' ' + classes.labelOpen : '')}
                role="button"
                aria-haspopup="true"
                aria-expanded={widthOpen}
                aria-controls="width-picker">
                <div className={classes.widthIconContainer}>
                    <div className={classes.widthIcon} style={{
                        width: lineWidth,
                        height: lineWidth
                    }}></div>
                </div>
                <span>{lineWidth}px</span>

            </label>
            <div id="width-picker" className={classes.inputContainer + ' ' + classes.inputContainerRotated + (widthOpen ? ' ' + classes.inputOpen : '')}>
                <div className={classes.inputCenter}>
                    <div style={{
                        backgroundColor: '#000',
                        borderRadius: '50%',
                        width: '4px',
                        height: '4px',
                        marginRight: '8px'
                    }}></div>
                    <input id="width-input" className={classes.inputRange} type="range" min="4" max="20" defaultValue={lineContext.width} onInput={(e) => handleWidthChange(parseInt(e.currentTarget.value))} />
                    <div style={{
                        backgroundColor: '#000',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        marginLeft: '8px'
                    }}></div>
                </div>
            </div>
        </div>
    );
};