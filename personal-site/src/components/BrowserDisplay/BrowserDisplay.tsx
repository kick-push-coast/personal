import { useContext } from 'react';
import { BrowserContent } from '../BrowserContent';
import { BrowserToolbar } from '../BrowserToolbar';
import { GlobalLoadedStateContext } from '../LayoutContainer';
import classes from './browser-display.module.scss';

export const BrowserDisplay = () => {

    const globalLoadedStateContext = useContext(GlobalLoadedStateContext)
	
	return (
		<div className={classes.container + (globalLoadedStateContext.loaded ? ' ' + classes.loaded : '')}>
            <BrowserToolbar />
            <BrowserContent />
        </div>
	);
};