import React, { useState } from 'react';
import classes from './layout-container.module.scss';

export interface LayoutContainerProps {
    children: React.ReactNode;
}

export interface GlobalLoadedStateContextType {
    loaded: boolean;
    setAssetsLoaded: Function;
}

export const GlobalLoadedStateContext = React.createContext({} as GlobalLoadedStateContextType);


export const LayoutContainer = (props: LayoutContainerProps) => {
    const [loadedState, setLoadedState] = useState(false);

    const globalLoadedState: GlobalLoadedStateContextType = {
        loaded: loadedState,
        setAssetsLoaded: (loaded: boolean) => {
            setLoadedState(loaded);
        }
    }
	
	return (
        <GlobalLoadedStateContext.Provider value={globalLoadedState}>
            <div className={classes.layout + (loadedState ? ' ' + classes.loaded : '')}>
                { props.children }
            </div>
        </GlobalLoadedStateContext.Provider>
	);
};