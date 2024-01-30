import { BoardCanvas } from '../BoardCanvas';
import { BoardToolbar } from '../BoardToolbar';
import classes from './board-container.module.scss';

export const BoardContainer = () => {
	
	return (
		<div className={classes.container}>
            <BoardToolbar></BoardToolbar>
            <BoardCanvas></BoardCanvas>
        </div>
	);
};