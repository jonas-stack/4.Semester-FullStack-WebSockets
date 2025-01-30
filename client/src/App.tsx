import React, { useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

// Define the WebSocket server URL
const SOCKET_URL = 'ws:/Localhost:8181';

const App: React.FC = () => {
    // State to store the history of received messages
    const [messageHistory, setMessageHistory] = useState<string[]>([]);
    // State to store the current input message
    const [inputMessage, setInputMessage] = useState<string>('');

    // Use the useWebSocket hook to manage the WebSocket connection
    const { sendMessage, readyState } = useWebSocket(SOCKET_URL, {
        // Callback when the WebSocket connection is opened
        onOpen: () => console.log('Connected to WebSocket'),
        // Callback when the WebSocket connection is closed
        onClose: () => console.log('Disconnected from WebSocket'),
        // Callback when a message is received from the WebSocket server
        onMessage: (message) => {
            if (message.data) {
                // Add the received message to the message history
                setMessageHistory((prev) => [...prev, message.data]);
            }
        },
    });

    // Function to handle sending a message to the WebSocket server
    const handleSendMessage = () => {
        sendMessage(inputMessage);
        setInputMessage(''); // Clear the input field after sending the message
    };

    // Map the WebSocket ready state to a human-readable status
    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return (
        <div>
            <h1>WebSocket Client</h1>
            <p>Connection Status: {connectionStatus}</p>
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
            />
            <button onClick={handleSendMessage} disabled={readyState !== ReadyState.OPEN}>
                Send Message
            </button>
            <h2>Message History</h2>
            <ul>
                {messageHistory.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;