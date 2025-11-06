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
            <label
                title="Clear"
                tabIndex={0}
                onClick={() => setClearOpen(!clearOpen)}
                onKeyDown={(e) => (e.key === 'Enter') && setClearOpen(!clearOpen)}
                className={classes.label + ' ' + classes.labelBottom + (clearOpen ? ' ' + classes.labelOpen : '')}
                role="button"
                aria-haspopup="true"
                aria-expanded={clearOpen}
                aria-controls="clear-prompt">
                <img alt="Trash can icon" className={classes.dashImg} src={trashSvg} />
            </label>
            <div id="clear-prompt" className={classes.inputContainer + ' ' + classes.inputBottom + ' ' + (clearOpen ? ' ' + classes.inputOpen : '')}>
                <div className={classes.inputMargin + ' ' + classes.form}>
                    <h2 className={classes.title}>Clear drawing board? ☠️</h2>
                    <div className={promptClasses.options}>
                        <button className={promptClasses.button} onClick={handleClear}>
                            Yes, clear
                        </button>
                        <button className={promptClasses.cancel} onClick={() => setClearOpen(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};