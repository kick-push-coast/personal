import { Route, Routes } from 'react-router-dom';
import { DotGame } from '../DotGame';
import classes from './browser-fun.module.scss';

export const BrowserFun = () => {
	
	return (
		<div className={classes.container}>
            <div className={classes.content}>
                <Routes>
                    <Route path="/" element={<DotGame />} />
                </Routes>
            </div>
            <div className={classes.funDetails}>

            </div>
        </div>
	);

};