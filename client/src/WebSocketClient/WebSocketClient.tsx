import useWebSocket, { ReadyState } from 'react-use-websocket';

export class WebSocketClient {
    private socketUrl: string;
    private sendMessage: (message: string) => void;
    private readyState: ReadyState;
    private setMessageHistory: React.Dispatch<React.SetStateAction<{ type: string, content: string }[]>>;

    constructor(socketUrl: string, setMessageHistory: React.Dispatch<React.SetStateAction<{ type: string, content: string }[]>>) {
        this.socketUrl = socketUrl;
        this.setMessageHistory = setMessageHistory;

        const { sendMessage, readyState } = useWebSocket(this.socketUrl, {
            onOpen: () => console.log('Connected to WebSocket'),
            onClose: () => console.log('Disconnected from WebSocket'),
            onMessage: (message) => {
                if (message.data) {
                    this.setMessageHistory((prev) => [...prev, { type: 'received', content: message.data }]);
                }
            },
        });

        this.sendMessage = sendMessage;
        this.readyState = readyState;
    }

    public handleSendMessage(inputMessage: string) {
        this.sendMessage(inputMessage);
        this.setMessageHistory((prev) => [...prev, { type: 'sent', content: inputMessage }]);
    }

    public getConnectionStatus() {
        return {
            [ReadyState.CONNECTING]: 'Connecting',
            [ReadyState.OPEN]: 'Open',
            [ReadyState.CLOSING]: 'Closing',
            [ReadyState.CLOSED]: 'Closed',
            [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
        }[this.readyState];
    }
}