import { useEffect, useRef, useState } from 'react';
import useClickOutside from '../../../../hooks/use-click-outside';
import trashSvg from '../../../../assets/trash.svg';
import classes from '../../board-toolbar.module.scss';
import promptClasses from './clear-prompt.module.scss';

export interface ClearPromptProps {
    onImageClear: () => void
}

export const ClearPrompt = (props: ClearPromptProps) => {
        
    const registerClickOutside = useClickOutside();
    const clearRef = useRef<HTMLDivElement>(null);
    const [clearOpen, setClearOpen] = useState(false);

    useEffect(() => {
        clearRef.current && registerClickOutside(clearRef.current, () => setClearOpen(false));
    }, [])

    function handleClear() {
        props.onImageClear();
        setClearOpen(false);
    }
	
	return (
        <div ref={clearRef} className={classes.option}>
            <label tabIndex={0} onClick={() => setClearOpen(!clearOpen)} className={classes.label + (clearOpen ? ' ' + classes.labelOpen : '')}>
                <img className={classes.dashImg} src={trashSvg} />
            </label>
            <div className={classes.inputContainer + ' ' + classes.inputBottom + ' ' + (clearOpen ? ' ' + classes.inputOpen : '')}>
                <div className={classes.inputMargin}>
                    <h2 className={classes.title}>&nbsp;&nbsp; Clear drawing board? ☠️</h2>
                    <div className={promptClasses.options}>
                        <button className={promptClasses.button} onClick={handleClear}>
                            Yes, clear
                        </button>
                    </div>
                </div>
            </div>
        </div>
	);
};