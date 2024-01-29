import { Route, Routes } from 'react-router-dom';
import { DotGame } from '../DotGame';
import classes from './browser-fun.module.scss';
import { ProjectDetails } from '../ProjectDetails';

export const BrowserFun = () => {
	
	return (
		<div className={classes.container}>
            <div className={classes.content}>
                <Routes>
                    <Route path="/" element={<DotGame />} />
                </Routes>
            </div>
            <div className={classes.details}>
                <Routes>
                    <Route path="/" element={<ProjectDetails tech={['Vanilla JS', 'HTML Canvas', 'Web Components']} githubLink='https://github.com/kick-push-coast/personal/tree/master/dot-game' />} />
                </Routes>
            </div>
        </div>
	);

};