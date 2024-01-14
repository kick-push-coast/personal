import React, { useState } from 'react';
import classes from './layout-container.module.scss';

export interface LayoutContainerProps {
    children: React.ReactNode;
}

export interface GlobalFunctionsContextType {
    setAssetsLoaded: Function;
}

export const GlobalFunctionsContext = React.createContext({} as GlobalFunctionsContextType);


export const LayoutContainer = (props: LayoutContainerProps) => {
    const [loadedState, setLoadedState] = useState(false);

    const globalFunctions: GlobalFunctionsContextType = {
        setAssetsLoaded: (loaded: boolean) => {
            setLoadedState(loaded);
        }
    }
	
	return (
        <GlobalFunctionsContext.Provider value={globalFunctions}>
            <div className={classes.layout + (loadedState ? ' ' + classes.loaded : '')}>
                { props.children }
            </div>
        </GlobalFunctionsContext.Provider>
	);
};