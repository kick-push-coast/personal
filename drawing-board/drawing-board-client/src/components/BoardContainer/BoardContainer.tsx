import React, { useState } from 'react';
import { SocketContext } from '../../context/socket-context';
import { BoardCanvas } from '../BoardCanvas';
import { BoardToolbar } from '../BoardToolbar';
import { LineContext } from '../../context/line-context';
import classes from './board-container.module.scss';

export const SocketContextInstance = React.createContext({} as SocketContext);
export const LineContextInstance = React.createContext({} as LineContext)

export const BoardContainer = () => {
    const [socketContext] = useState(new SocketContext())
    const [lineContext] = useState(new LineContext());
    const [generatedImage, setGeneratedImage] = useState<ImageData | undefined>(undefined);
	return (
        <LineContextInstance.Provider value={lineContext}>
            <SocketContextInstance.Provider value={socketContext}>
                <div className={classes.container}>
                    <BoardToolbar onImageGenerate={setGeneratedImage}></BoardToolbar>
                    <BoardCanvas generatedImage={generatedImage}></BoardCanvas>
                </div>
            </SocketContextInstance.Provider>
        </LineContextInstance.Provider>
	);
};