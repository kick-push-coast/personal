import { TabLinks } from '../TabLinks';
import classes from './browser-toolbar.module.scss';

export const BrowserToolbar = () => {
	
	return (
		<div className={classes.container}>
            <div className={classes.topBar}>
                <div className={classes.utilityBtns}>
                    <div className={classes.utilityBtn}></div>
                    <div className={classes.utilityBtn}></div>
                    <div className={classes.utilityBtn}></div>
                </div>
                <TabLinks />
            </div>
            <div className={classes.bottomBar}>
                <div className={classes.urlInput}></div>
            </div>
        </div>
	);
};