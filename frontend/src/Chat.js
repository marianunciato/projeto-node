import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';

let socket = new WebSocket('ws://172.19.37.206:3001');

socket.onmessage = (event) => {
  const messageObject = JSON.parse(event.data);
  if (messageObject?.type === "config" && !localStorage.getItem("userId")) {
    localStorage.setItem("userId", messageObject.userId)
  }
}

const Chat = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.onmessage = (event) => {
      const messageObject = JSON.parse(event.data);
      if (messageObject.type === "message") {
        setMessages((prevMessages) => [...prevMessages, messageObject]);
      }
    };

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    socket.onerror = (error) => {
      console.log('WebSocket error:', error);
    };
  }, []);

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
        userId: localStorage.getItem("userId"),
        username,
        timestamp: new Date().toISOString(),
      };
      socket.send(JSON.stringify(messageObject));
      setInput('');
    }
  };

  const getMessageStyle = (userId) => {
    console.log(userId)
    if (userId === localStorage.getItem("userId")) {
      return { content: "bg-purple-600 text-white place-self-end", title: "text-right w-full", messagetext: "text-left w-full"};
    } else {
      return { content: "bg-blue-500 text-white place-self-start", title: "text-left w-full", messagetext: "text-left w-full"};
    }
  };

  return (
    <div className="flex flex-col bg-zinc- p-2 my-2 rounded-xl">
      <div className='flex flex-col h-96 w-full overflow-y-auto'>
        {messages.map((msg, index) => {
          const formattedTime = format(new Date(msg.timestamp), 'HH:mm');
          return (
            <div key={index} className={`balao-mensagem flex my-1 px-3 py-2 rounded-xl w-fit max-w-96 break-all h-fit flex-wrap flex-col items-end justify-end ${getMessageStyle(msg.userId).content}`}>
              <p className={`text-sm font-bold flex justify-self-start ${getMessageStyle(msg.userId).title}`}>{msg.username}</p>
              <p className={`${getMessageStyle(msg.userId).messagetext}`}>{msg.message}</p>
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
          className="input-mensagem w-96 h-11 px-5 py-3 border-2 border-pink-500 text-white bg-gray-900 bg-opacity-30 backdrop-blur-sm rounded-l-full"
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