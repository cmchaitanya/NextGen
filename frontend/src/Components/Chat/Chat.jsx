import React, { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import { StoreContext } from '../../Context/StoreContext';
import './Chat.css';

let socket;

const Chat = ({ pId }) => {
    const { url } = useContext(StoreContext);
    const [msg, setMsg] = useState('');
    const [allMsg, setAllMsg] = useState([]);
    const username = localStorage.getItem('userName'); // Get username from localStorage

    useEffect(() => {
        socket = io(url);

        socket.on('connect', () => {
            console.log('Socket Connected');
        });

        socket.on('getMsg', (data) => {
            const filteredData = data.filter((item) => item.productId === pId);
            setAllMsg(filteredData);
        });

        return () => {
            socket.disconnect(); // Clean up socket connection on component unmount
        };
    }, [url, pId]);

    const handleSend = () => {
        if (msg.trim() && username) {
            const data = { username, msg, productId: pId };
            socket.emit('sendMsg', data);
            setMsg(''); // Clear input field after sending
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>Chat with Seller</h2>
            </div>
            <div className="chat-messages">
                {allMsg && allMsg.length > 0 ? (
                    allMsg.map((item, index) => (
                        <div
                            key={index}
                            className={`chat-message ${
                                item.username === username
                                    ? 'chat-message-sender'
                                    : 'chat-message-receiver'
                            }`}
                        >
                            <span className="chat-username">{item.username}</span>
                            <span>{item.msg}</span>
                        </div>
                    ))
                ) : (
                    <p className="chat-no-messages">No messages yet. Start the conversation!</p>
                )}
            </div>
            <div className="chat-input-container">
                {username ? (
                    <>
                        <input
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                            className="chat-input"
                            type="text"
                            placeholder="Type your message..."
                        />
                        <button onClick={handleSend} className="chat-send-button">
                            Send
                        </button>
                    </>
                ) : (
                    <p className="chat-login-prompt">
                        You must log in to send messages.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Chat;
