import React, { useEffect, useState } from 'react';
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
    const [clearImage, setClearImage] = useState(false);

    useEffect(() => {
        if (clearImage) setClearImage(false);
    }, [clearImage]);

	return (
        <LineContextInstance.Provider value={lineContext}>
            <SocketContextInstance.Provider value={socketContext}>
                <div className={classes.container}>
                    <BoardToolbar onImageClear={() => setClearImage(true)} onImageGenerate={setGeneratedImage}></BoardToolbar>
                    <BoardCanvas clearImage={clearImage} generatedImage={generatedImage}></BoardCanvas>
                </div>
            </SocketContextInstance.Provider>
        </LineContextInstance.Provider>
	);
};