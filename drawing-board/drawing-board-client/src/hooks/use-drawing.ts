import { useContext, useRef } from "react";
import { SocketContextInstance } from "../components/BoardContainer/BoardContainer";

export default function useDrawing() {
    let isPainting = false;
    let lineWidth = 5;

    const socketContext = useContext(SocketContextInstance);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    function registerCanvas(container: HTMLDivElement, canvas: HTMLCanvasElement) {
        containerRef.current = container;
        canvasRef.current = canvas;
        ctxRef.current = canvasRef.current.getContext('2d');

        setDrawEventListeners();
        setSocketRoom();
    }

    function draw(e: MouseEvent) {
        if (!isPainting || !ctxRef.current || !canvasRef.current) {
            return;
        }
        ctxRef.current.lineWidth = lineWidth;
        ctxRef.current.lineCap = 'round';
        ctxRef.current.lineTo(e.offsetX, e.offsetY);
        ctxRef.current.stroke();

        socketContext.emitDrawing(canvasRef.current.toDataURL('image/png'));
    }

    function setDrawEventListeners() {
        if (!canvasRef.current || !containerRef.current) return;
        canvasRef.current.addEventListener('mousedown', () => {
            isPainting = true;
        });
        canvasRef.current.addEventListener('mouseup', () => {
            isPainting = false;
            ctxRef.current && ctxRef.current.stroke();
            ctxRef.current && ctxRef.current.beginPath();
        });
        canvasRef.current.addEventListener('mousemove', draw);

        socketContext.registerDrawEventListener((image: string) => {
            setCanvasImage(image);
        })
    }

    function setCanvasDimensions(height?: number, width?: number) {
        if (!canvasRef.current || !containerRef.current) return;
        canvasRef.current.width = width || Math.floor(containerRef.current.getBoundingClientRect().width);
        canvasRef.current.height = height || Math.floor(containerRef.current.getBoundingClientRect().height);
    }

    function setCanvasImage(data: string) {
        if (!data) return;
        let image = new Image();
        image.onload = () => {
            ctxRef.current && ctxRef.current.drawImage(image, 0, 0);
        }
        image.src = data;
    }

    function setSocketRoom() {
        if (!canvasRef.current || !containerRef.current) return;
        
        /**Detect existing room ID */
        const urlParams = new URLSearchParams(window.location.search);
        const existingRoomId = urlParams.get('drawingSession');
        if (existingRoomId) {
            socketContext.joinSocketRoom(existingRoomId, () => {
                if (socketContext.roomId && socketContext.initialCanvasState) {
                    setCanvasDimensions(socketContext.initialCanvasState.height, socketContext.initialCanvasState.width);
                    setCanvasImage(socketContext.initialCanvasState.image);
                }
            });
        } else {
            setCanvasDimensions();
            socketContext.createSocketRoom({
                height: canvasRef.current.height,
                width: canvasRef.current.width,
                image: canvasRef.current.toDataURL('image/png')
            })
        }
    }

    return { registerCanvas };
}