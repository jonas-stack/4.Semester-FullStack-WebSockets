import React, { useState } from 'react';
import { WebSocketClient } from './WebSocketClient/WebSocketClient';

const SOCKET_URL = 'ws://localhost:8181';

const App: React.FC = () => {
    const [messageHistory, setMessageHistory] = useState<{ type: string, content: string }[]>([]);
    const [inputMessage, setInputMessage] = useState<string>('');

    const webSocketClient = new WebSocketClient(SOCKET_URL, setMessageHistory);

    const handleSendMessage = () => {
        webSocketClient.handleSendMessage(inputMessage);
        setMessageHistory((prev) => [...prev, { type: 'sent', content: inputMessage }]);
        setInputMessage('');
    };

    return (
        <div>
            <h1>WebSocket Client</h1>
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>
                Send Message
            </button>
            <h2>Message History</h2>
            <ul>
                {messageHistory.map((message, index) => (
                    <li key={index}>
                        {message.type === 'sent' ? 'Sent: ' : 'Received: '}
                        {message.content}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;