import { Socket, io } from "socket.io-client";
import { InitialCanvasState } from "../components/BoardCanvas";

export class SocketContext {
    roomId: string | undefined;
    initialCanvasState: InitialCanvasState | undefined;
    private drawTimeout: NodeJS.Timeout | undefined;
    private socket: Socket;
    private drawEventCallbacks: ((image: string) => unknown)[] = [];

    constructor() {
        // this.socket = io('https://miketyler.us');
        this.socket = io('http://localhost:3000');
    }


    createSocketRoom(initialState: InitialCanvasState, callback?: (id: string) => void) {
        const roomId = crypto.randomUUID();
        this.roomId = roomId;
        this.initialCanvasState = initialState;
        this.socket.emit('drawing-room-create', roomId, initialState);

        this.subscribeToSocketRoom();
        this.setUrlParams(roomId);
        callback && callback(roomId);

        console.log('Created drawing session: ' + roomId);
    }

    joinSocketRoom(roomId: string, callback?: () => void) {
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
                    this.setUrlParams();
                    alert('Drawing session ' + roomId + ' has ended. Click "draw with a friend" to begin a new session.');
                }
                callback && callback();
            }
        );
    }

    setUrlParams(roomId?: string) {
        const url = new URL(window.location.href);
        if (roomId) {
            url.searchParams.set('drawingSession', roomId);
        } else {
            url.searchParams.delete('drawingSession');
        }
        window.history.pushState({}, document.title, url);
    }

    emitDrawing(data: string) {
        if (!this.roomId) return;
        if (this.drawTimeout) clearTimeout(this.drawTimeout);
        this.drawTimeout = setTimeout(() => {
            this.socket.emit('drawing-board-update', this.roomId, data);
        }, 200);
    }

    registerDrawEventListener(fn: (image: string) => unknown) {
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