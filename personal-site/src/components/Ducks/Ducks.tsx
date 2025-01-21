import { MutableRefObject, useEffect, useRef, useState } from 'react';
import useSwimAnimation from '../../hooks/use-swim-animation';
import classes from './ducks.module.scss';

export interface DuckProps {
    containerRef: MutableRefObject<HTMLDivElement>;
    startAfter: number;
}

export const Ducks = () => {

    const containerElement = useRef(null as unknown as HTMLDivElement);
	
	return (
        <div ref={containerElement} className={classes.container}>
            <Duck containerRef={containerElement} startAfter={0}/>    
            <Duck containerRef={containerElement} startAfter={9000}/> 
            <Duck containerRef={containerElement} startAfter={15000}/> 
            <Duck containerRef={containerElement} startAfter={21000}/> 
            <Duck containerRef={containerElement} startAfter={27000}/>       
        </div>
	);
};

const Duck = (props: DuckProps) => {

    const [duckIsSwimming, setDuckIsSwimming] = useState(false);
    const duckElement = useRef(null as unknown as HTMLDivElement);
    const duckSwimmer = useSwimAnimation(props.containerRef, duckElement);

    useEffect(() => {
        setTimeout(() => { 
            setDuckIsSwimming(true);
            duckSwimmer.startSwimming(); 
        }, props.startAfter);
    }, []);

    return (
        <div onClick={duckSwimmer.toggleSwimming} aria-hidden ref={duckElement} className={classes.duck + (duckIsSwimming ? '' : ' hide')}>
            <div>{duckSwimmer.isPaused ? '\u00A0\u00A0\u00A0\m' : '\u00A0\u00A0\u00A0\u00A0mm'}</div>
            <div>{duckSwimmer.isPaused ? '\u00A0(oVo)' : '___( o)>'}</div>
            <div>{duckSwimmer.isPaused ? '(<\u00A0\u00A0\u00A0>)' : '\\ <_. )'}</div>
            <div>{duckSwimmer.isPaused ? "\u00A0`m-m'" : "\u00A0`-mm'"}</div>
        </div>
    )
}