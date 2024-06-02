import { useContext, useRef } from "react";
import { LineContextInstance, SocketContextInstance } from "../components/BoardContainer/BoardContainer";

export default function useDrawing() {
    let isPainting = false;
    
    const socketContext = useContext(SocketContextInstance);
    const lineContext = useContext(LineContextInstance);

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
        ctxRef.current.lineCap = 'round';
        ctxRef.current.lineWidth = lineContext.width;
        ctxRef.current.setLineDash(lineContext.dashValue);
        ctxRef.current.strokeStyle = lineContext.color;
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
        
        /**Detect existing room and get initial state */
        const urlParams = new URLSearchParams(window.location.search);
        const existingRoomId = urlParams.get('drawingSession');
        if (existingRoomId) {
            socketContext.joinSocketRoom(existingRoomId, () => {
                if (socketContext.roomId && socketContext.initialCanvasState) {
                    setCanvasDimensions(socketContext.initialCanvasState.height, socketContext.initialCanvasState.width);
                    setCanvasImage(socketContext.initialCanvasState.image);
                } else {
                    setCanvasDimensions();
                }
            });
        /**Otherwise, just initialize default canvas */
        } else {
            setCanvasDimensions();
        }
    }

    function setCanvasImageData(imageData: ImageData) {
        const tempCanvas = document.createElement('canvas');
        const tempContext = tempCanvas.getContext('2d');
        tempCanvas.width = imageData.width;
        tempCanvas.height = imageData.height;
        const finalImageDimension = canvasRef.current?.height || 1024;
        const currentCanvasWidth = canvasRef.current?.width || 1024;
        const xOffset = (currentCanvasWidth - finalImageDimension) / 2;

        tempContext && tempContext.putImageData(imageData, 0, 0);
        ctxRef.current && ctxRef.current.drawImage(tempCanvas, xOffset, 0, finalImageDimension, finalImageDimension);
        canvasRef.current && socketContext.emitDrawing(canvasRef.current.toDataURL('image/png'));
    }

    function clearImage() {
        if (ctxRef.current && canvasRef.current) {
            ctxRef.current.fillStyle = 'white';
            ctxRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            socketContext.emitDrawing(canvasRef.current.toDataURL('image/png'));
        }
    }

    return { registerCanvas, setCanvasImageData, clearImage };
}