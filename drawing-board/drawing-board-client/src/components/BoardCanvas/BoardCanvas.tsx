import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import classes from './board-canvas.module.scss';

export const BoardCanvas = () => {

    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasOffsetX = useRef(0);
    const canvasOffsetY = useRef(0);
    const roomIdRef = useRef('');

    let isPainting = false;
    let lineWidth = 5;

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        /**Set up socket handlers */
        // const socket = io('https://miketyler.us');
        const socket = io('localhost:3000', {
            path: '/drawing-socket'
        });
        function createSocketRoom() {
            const roomId = crypto.randomUUID();
            console.log('Created drawing room: ' + roomId);
            joinSocketRoom(roomId);
        }
        function joinSocketRoom(roomId: string) {
            roomIdRef.current = roomId;
            socket.emit('drawing-room-join', roomId);
            console.log('Joined drawing room: ' + roomId);
            subscribeToSocketRoom();
        }
        function subscribeToSocketRoom() {
            socket.on('drawing-board-update', (data) => {
                if (!ctx) return;
                let image = new Image();
                image.onload = () => {
                    ctx.drawImage(image, 0, 0);
                }
                image.src = data;
            })
        }

        /**Detect existing room ID */
        const urlParams = new URLSearchParams(window.location.search);
        const existingRoomId = urlParams.get('drawingRoom');
        if (existingRoomId) {
            joinSocketRoom(existingRoomId);
        } else {
            createSocketRoom();
        }

        /**Define draw behavior */
        let drawTimeout: NodeJS.Timeout; 
        const draw = (e: MouseEvent) => {
            if (!isPainting) {
                return;
            }
            ctx.lineWidth = lineWidth;
            ctx.lineCap = 'round';            
            ctx.lineTo(e.clientX - canvasOffsetX.current, e.clientY - canvasOffsetY.current);
            ctx.stroke();

            if (drawTimeout) clearTimeout(drawTimeout);
            drawTimeout = setTimeout(() => {
                if (!canvasRef.current) return;
                let data = canvasRef.current.toDataURL('image/png');
                socket.emit('drawing-board-update', roomIdRef.current, data);
            }, 200);
        }
        canvasRef.current.addEventListener('mousedown', () => {
            isPainting = true;
        });        
        canvasRef.current.addEventListener('mouseup', () => {
            isPainting = false;
            ctx.stroke();
            ctx.beginPath();
        });    
        canvasRef.current.addEventListener('mousemove', draw);
        

        /**Set up canvas dimensions */
        canvasRef.current.width = Math.floor(containerRef.current.getBoundingClientRect().width);
        canvasRef.current.height = Math.floor(containerRef.current.getBoundingClientRect().height);
        function setCanvasOffset() {
            setTimeout(() => {
                if (!canvasRef.current) return;
                canvasOffsetX.current = canvasRef.current.getBoundingClientRect().left;
                canvasOffsetY.current = canvasRef.current.getBoundingClientRect().top;
            }, 1200);
        }
        setCanvasOffset();
        window.addEventListener('resize', setCanvasOffset);
        
    }, [])    


    return (
        <div ref={containerRef} className={classes.container}>
            <canvas ref={canvasRef} className={classes.canvas}></canvas>
        </div>
    );
};