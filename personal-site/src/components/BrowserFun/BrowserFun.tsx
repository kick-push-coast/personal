import { DotGame } from '../DotGame';
import { ProjectDetails, ProjectDetailsProps } from '../ProjectDetails';
import { BoardContainer } from 'drawing-board-client';
import classes from './browser-fun.module.scss';

export enum FunMode {
    dotGame,
    drawingBoard
}

interface FunDetails extends ProjectDetailsProps {
    component: React.ReactNode;
}

const FunMap = new Map<FunMode, FunDetails>([
    [
        FunMode.dotGame, 
        {
            component: <DotGame />,
            tech: ['Vanilla JS', 'HTML Canvas', 'Web Components'],
            link: 'https://github.com/kick-push-coast/personal/tree/master/dot-game',
            linkLabel: 'View on GitHub'
        }
    ],
    [
        FunMode.drawingBoard,
        {
            component: <BoardContainer />,
            tech: ['React', 'Node.js', 'HTML Canvas', 'OpenAI API', 'Web Sockets'],
            link: 'https://github.com/kick-push-coast/personal/tree/master/drawing-board',
            linkLabel: 'View on GitHub'
        }
    ]
]);

export const BrowserFun = (props: {mode: FunMode}) => {

    const selectedFun = FunMap.get(props.mode);
	
	return (
        selectedFun ?
        <>
            <div className={classes.container}>
                {selectedFun.component}
            </div>
            <ProjectDetails tech={selectedFun.tech} link={selectedFun.link} linkLabel={selectedFun.linkLabel} />
        </> : null
	);

};