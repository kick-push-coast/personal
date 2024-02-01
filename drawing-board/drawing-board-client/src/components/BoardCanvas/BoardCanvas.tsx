import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import classes from './board-canvas.module.scss';

export const BoardCanvas = () => {

    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    let isPainting = false;
    let lineWidth = 5;

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const canvasOffsetX = canvasRef.current.getBoundingClientRect().left;
        const canvasOffsetY = canvasRef.current.getBoundingClientRect().top;
        let drawTimeout: NodeJS.Timeout;
        const socket = io('https://miketyler.us');

        socket.on('drawing-board-update', (data) => {
            let image = new Image();
            image.onload = () => {
                ctx.drawImage(image, 0, 0);
            }
            image.src = data;
        })

        const draw = (e: MouseEvent) => {
            if (!isPainting) {
                return;
            }
            ctx.lineWidth = lineWidth;
            ctx.lineCap = 'round';            
            ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
            ctx.stroke();

            if (drawTimeout) clearTimeout(drawTimeout);
            drawTimeout = setTimeout(() => {
                if (!canvasRef.current) return;
                let data = canvasRef.current.toDataURL('image/png');
                socket.emit('drawing-board-update', data);
            }, 200);
        }
        
        canvasRef.current.width = containerRef.current.offsetWidth;
        canvasRef.current.height = containerRef.current.offsetHeight;

        canvasRef.current.addEventListener('mousedown', () => {
            isPainting = true;
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
            <canvas ref={canvasRef} className={classes.canvas}></canvas>
        </div>
    );
};