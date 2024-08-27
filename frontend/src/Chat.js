import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import './App.css'

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket('ws://172.19.37.206:3001');
    setSocket(ws);

    ws.onmessage = (event) => {
      const messageObject = JSON.parse(event.data);
      const { message, userId: senderId, timestamp } = messageObject;

      if (!userId && senderId) {
        setUserId(senderId);
      }

      setMessages((prevMessages) => [...prevMessages, { message, senderId, timestamp }]);
    };

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    ws.onerror = (error) => {
      console.log('WebSocket error:', error);
    };

    return () => ws.close();
  }, [userId]);

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() && socket && socket.readyState === WebSocket.OPEN) {
      const messageObject = {
        message: input,
        userId,
        timestamp: new Date().toISOString(),
      };
      socket.send(JSON.stringify(messageObject));
      setInput('');
    }
  };


  return (
    <div className="flex flex-col bg-zinc- p-2 my-2 rounded-xl">
      <div className='flex flex-col h-96 w-full overflow-y-auto'>
        {messages.map((msg, index) => {
          const formattedTime = format(new Date(msg.timestamp), 'HH:mm');
          return (
            <div key={index} className={`balao-mensagem flex my-1 px-3 py-2 rounded-xl w-fit max-w-96 break-all h-fit flex-wrap items-end justify-end ${msg.senderId === userId ? 'bg-purple-600 text-white place-self-end' : 'bg-teal-500 text-black place-self-start'}`}>
              {msg.message}
              <p className="flex text-slate-200 text-[13px] ml-2">{formattedTime}</p>
            </div>
          );
        })}
        <div ref={messagesEndRef}/>
      </div>
      <div className="flex items-end pt-2">
        <input
          type="text"
          value={input}
          placeholder='Mensagem'
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="input-mensagem w-96 h-11 px-5 py-3 border-2 border-pink-500 text-white bg-gray-900 rounded-l-full"
        />
        <button className="bg-pink-500 hover:bg-pink-600 h-11 w-16 rounded-r-full text-white flex justify-center items-center" onClick={sendMessage}>
          <span className="material-symbols-outlined">
            send
          </span>
        </button>
      </div>
    </div>
  );
};

export default Chat;