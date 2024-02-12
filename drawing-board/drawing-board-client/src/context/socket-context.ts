import { Socket, io } from "socket.io-client";
import { InitialCanvasState } from "../components/BoardCanvas";

export class SocketContext {
    roomId: string | undefined;
    initialCanvasState: InitialCanvasState | undefined;
    private drawTimeout: NodeJS.Timeout | undefined;
    private socket: Socket;
    private drawEventCallbacks: ((image: string) => any)[] = [];

    constructor() {
        // this.socket = io('https://miketyler.us');
        this.socket = io('localhost:3000', {
            path: '/drawing-socket'
        });
    }


    createSocketRoom(initialState: InitialCanvasState) {
        const roomId = crypto.randomUUID();
        this.roomId = roomId;
        this.initialCanvasState = initialState;
        this.socket.emit('drawing-room-create', roomId, initialState);
        this.subscribeToSocketRoom();
        console.log('Created drawing session: ' + roomId);
    }

    joinSocketRoom(roomId: string, callback: Function) {
        this.socket.emit(
            'drawing-room-join',
            roomId,
            (initialState: InitialCanvasState) => {
                if (initialState !== null) {
                    this.roomId = roomId;
                    this.initialCanvasState = initialState;
                    this.subscribeToSocketRoom();
                    console.log('Joined drawing session: ' + roomId);
                } else {
                    const url = new URL(window.location.href);
                    url.searchParams.delete('drawingSession');
                    window.history.pushState({}, document.title, url);
                    alert('Drawing session ' + roomId + ' has ended. Click "draw with a friend" to begin a new session.');
                }
                callback();
            }
        );
    }

    emitDrawing(data: string) {
        if (!this.roomId) return;
        if (this.drawTimeout) clearTimeout(this.drawTimeout);
        this.drawTimeout = setTimeout(() => {
            this.socket.emit('drawing-board-update', this.roomId, data);
        }, 200);
    }

    registerDrawEventListener(fn: (image: string) => any) {
        this.drawEventCallbacks.push(fn);
    }

    private subscribeToSocketRoom() {
        this.socket.on('drawing-board-update', (data: string) => {
            for(const fn of this.drawEventCallbacks) {
                fn(data);
            }
        })
    }

}