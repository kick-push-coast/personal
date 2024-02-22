import { DotGame } from '../DotGame';
import { ProjectDetails } from '../ProjectDetails';
// import { BoardContainer } from 'drawing-board-client';
import { BoardContainer } from '../../../../drawing-board/drawing-board-client/dist/BoardContainer.es';
import classes from './browser-fun.module.scss';

export enum FunMode {
    dotGame,
    drawingBoard
}

interface FunDetails {
    component: React.ReactNode;
    tech: string[];
    githubLink: string;
}

const FunMap = new Map<FunMode, FunDetails>([
    [
        FunMode.dotGame, 
        {
            component: <DotGame />,
            tech: ['Vanilla JS', 'HTML Canvas', 'Web Components'],
            githubLink: 'https://github.com/kick-push-coast/personal/tree/master/dot-game'
        }
    ],
    [
        FunMode.drawingBoard,
        {
            component: <BoardContainer />,
            tech: ['React', 'Node.js', 'Web Sockets'],
            githubLink: 'https://github.com/kick-push-coast/personal/tree/master/drawing-board'
        }
    ]
]);

export const BrowserFun = (props: {mode: FunMode}) => {

    const selectedFun = FunMap.get(props.mode);
	
	return (
        selectedFun ?
		<div className={classes.container}>
            <div className={classes.content}>
                {selectedFun.component}
            </div>
            <div className={classes.details}>
                <ProjectDetails tech={selectedFun.tech} githubLink={selectedFun.githubLink} />
            </div>
        </div> : null
	);

};