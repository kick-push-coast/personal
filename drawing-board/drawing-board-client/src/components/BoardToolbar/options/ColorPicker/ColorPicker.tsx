import { useContext, useEffect, useRef, useState, MouseEvent } from 'react';
import { LineContextInstance } from '../../../BoardContainer/BoardContainer';
import useClickOutside from '../../../../hooks/use-click-outside';
import classes from '../../board-toolbar.module.scss';

export interface ColorPickerProps { }

export const ColorPicker = () => {

    const lineContext = useContext(LineContextInstance);
    const registerClickOutside = useClickOutside();

    const colorRef = useRef<HTMLDivElement>(null);
    const [colorOpen, setColorOpen] = useState(false);

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
    }, [])

    return (
        <div ref={colorRef}>
            <label title="Color" tabIndex={0} onClick={handleColorClick} className={classes.label + (colorOpen ? ' ' + classes.labelOpen : '')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 48 48">
                    <path fill={lineContext.color} d="M24 6c-9.94 0-18 8.06-18 18s8.06 18 18 18c1.66 0 3-1.34 3-3 0-.78-.29-1.48-.78-2.01-.47-.53-.75-1.22-.75-1.99 0-1.66 1.34-3 3-3h3.53c5.52 0 10-4.48 10-10 0-8.84-8.06-16-18-16zm-11 18c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm6-8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm10 0c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm6 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                    <path fill="none" d="M0 0h48v48h-48z" />
                </svg>
                <input className={classes.inputColor} type="color" defaultValue={lineContext.color} onInput={(e) => lineContext.updateColor(e.currentTarget.value)} />
            </label>
        </div>
    );
};