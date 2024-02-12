import { useContext, useRef } from "react";
import { SocketContextInstance } from "../BoardContainer/BoardContainer";
import { InitialCanvasState } from "../BoardCanvas";
import classes from "./share-button.module.scss";

export const ShareButton = (props: {canvas: React.RefObject<HTMLCanvasElement>}) => {

    const shareBtn = useRef<HTMLButtonElement>(null);
    const socketContext = useContext(SocketContextInstance);

    function handleShareClick() {
        if (!props.canvas.current) return;
        if (socketContext.roomId) {
            setShareLink(socketContext.roomId);
        } else {
            const initialState: InitialCanvasState = {
                height: props.canvas.current.height,
                width: props.canvas.current.width,
                image: props.canvas.current.toDataURL('image/png')
            }
            socketContext.createSocketRoom(initialState, (roomId: string) => {
                setShareLink(roomId);
            })
        }
    }

    function setShareLink(roomId: string) {
        const url = new URL(window.location.href);
        url.searchParams.set('drawingSession', roomId);
        navigator.clipboard.writeText(url.toString());
        if (shareBtn.current) {
            shareBtn.current.textContent = 'Share link copied ✓';
            setTimeout(() => {
                if (shareBtn.current) shareBtn.current.textContent = 'Draw with a friend';
            }, 3000);
        }
    }
	
	return (
		<button className={classes.button} ref={shareBtn} onClick={handleShareClick}>Draw with a friend</button>
	);
};