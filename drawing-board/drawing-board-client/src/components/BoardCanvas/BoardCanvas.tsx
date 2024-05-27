import { useEffect, useRef } from 'react';
import { ShareButton } from '../ShareButton';
import useDrawing from '../../hooks/use-drawing';
import classes from './board-canvas.module.scss';

interface BoardCanvasProps {
    generatedImage?: ImageData
}
export interface InitialCanvasState {
    height: number;
    width: number;
    image: string;
}

export const BoardCanvas = (props: BoardCanvasProps) => {

    const drawer = useDrawing();
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);


    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;
        drawer.registerCanvas(containerRef.current, canvasRef.current);        
    }, [])

    useEffect(() => {
        props.generatedImage && drawer.setCanvasImageData(props.generatedImage);
    }, [props.generatedImage])

    return (
        <>
            <div ref={containerRef} className={classes.container}>
                <canvas ref={canvasRef} className={classes.canvas}></canvas>
            </div>
            <ShareButton canvas={canvasRef}/>
        </>
    );
};