import React, { useState, useEffect } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');
    setSocket(ws);

    ws.onmessage = (event) => {
      console.log(`Message received: ${event.data}`);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    ws.onerror = (error) => {
      console.log('Websocket error:', error)
    }

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (input.trim() && socket && socket.readyState === WebSocket.OPEN) {
      socket.send(input);
      setInput('');
    }
  };  

  return (
    <div className="flex">
      <div>
        {messages.map((message, server) => (
          <div key={server}>{message}</div>
        ))}
      </div>
      <div className="flex items-center">
        <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        className="w-96 h-11 p-3 border-2 border-pink-700 rounded-lg my-5"
      />
      <button className="bg-pink-800 h-11 w-16 rounded-lg ml-5 text-white flex justify-center items-center" onClick={sendMessage}>
        <span class="material-symbols-outlined">
          send
        </span>
      </button>
      </div>
    </div>
  );
};

export default Chat;