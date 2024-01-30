import { useEffect, useRef } from 'react';
import classes from './board-canvas.module.scss';

export interface BoardCanvasProps { }

export const BoardCanvas = (props: BoardCanvasProps) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    let isPainting = false;
    let lineWidth = 5;
    let startX;
    let startY;

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const draw = (e: MouseEvent) => {
            if (!isPainting) {
                return;
            }
            ctx.lineWidth = lineWidth;
            ctx.lineCap = 'round';            
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
        }

        canvasRef.current.width = containerRef.current.offsetWidth;
        canvasRef.current.height = containerRef.current.offsetHeight;

        canvasRef.current.addEventListener('mousedown', (e) => {
            isPainting = true;
            startX = e.clientX;
            startY = e.clientY;
        });        
        canvasRef.current.addEventListener('mouseup', () => {
            isPainting = false;
            ctx.stroke();
            ctx.beginPath();
        });    
        canvasRef.current.addEventListener('mousemove', draw);

        
    }, [])    


    return (
        <div ref={containerRef} className={classes.container}>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};