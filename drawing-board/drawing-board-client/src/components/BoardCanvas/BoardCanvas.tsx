import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import classes from './board-canvas.module.scss';

interface InitialCanvasState {
    height: number;
    width: number;
    image: any;
}

export const BoardCanvas = () => {

    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
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
            if (!canvasRef.current || !containerRef.current) return;
            const roomId = crypto.randomUUID();
            roomIdRef.current = roomId;
            setCanvasDimensions();
            socket.emit('drawing-room-create', roomId, {
                image: canvasRef.current.toDataURL('image/png'),
                height: canvasRef.current.height,
                width: canvasRef.current.width 
            } as InitialCanvasState);
            subscribeToSocketRoom();
            console.log('Created drawing room: ' + roomId);
        }
        function joinSocketRoom(roomId: string) {
            roomIdRef.current = roomId;
            socket.emit('drawing-room-join', roomId, (initialState: InitialCanvasState) => {
                setCanvasDimensions(initialState.height, initialState.width);
                setCanvasImage(initialState.image)
            });
            console.log('Joined drawing room: ' + roomId);
            subscribeToSocketRoom();
        }
        function subscribeToSocketRoom() {
            socket.on('drawing-board-update', (data) => {
                setCanvasImage(data);
            })
        }

        function setCanvasImage(data: any) {
            if (!ctx) return;
            let image = new Image();
            image.onload = () => {
                ctx.drawImage(image, 0, 0);
            }
            image.src = data;
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
            ctx.lineTo(e.offsetX, e.offsetY);
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
        function setCanvasDimensions(height?: number, width?: number) {
            console.log(height);
            console.log(width);
            if (!canvasRef.current || !containerRef.current) return;
            canvasRef.current.width = width || Math.floor(containerRef.current.getBoundingClientRect().width);
            canvasRef.current.height = height || Math.floor(containerRef.current.getBoundingClientRect().height);
        }
        
    }, [])    


    return (
        <div ref={containerRef} className={classes.container}>
            <canvas ref={canvasRef} className={classes.canvas}></canvas>
        </div>
    );
};