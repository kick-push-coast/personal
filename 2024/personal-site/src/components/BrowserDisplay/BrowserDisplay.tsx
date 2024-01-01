import { BrowserContent } from '../BrowserContent';
import { BrowserToolbar } from '../BrowserToolbar';
import classes from './browser-display.module.scss';

export const BrowserDisplay = () => {
	
	return (
		<div className={classes.container}>
            <BrowserToolbar />
            <BrowserContent />
        </div>
	);
};