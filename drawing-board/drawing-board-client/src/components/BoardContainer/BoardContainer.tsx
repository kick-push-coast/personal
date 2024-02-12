import React, { useState } from 'react';
import { SocketContext } from '../../context/socket-context';
import { BoardCanvas } from '../BoardCanvas';
import { BoardToolbar } from '../BoardToolbar';
import classes from './board-container.module.scss';

export const SocketContextInstance = React.createContext({} as SocketContext);

export const BoardContainer = () => {
    const [socketContext] = useState(new SocketContext())
	return (
        <SocketContextInstance.Provider value={socketContext}>
            <div className={classes.container}>
                <BoardToolbar></BoardToolbar>
                <BoardCanvas></BoardCanvas>
            </div>
        </SocketContextInstance.Provider>
	);
};