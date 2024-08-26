import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');
    setSocket(ws);

    ws.onmessage = (event) => {
      const messageObject = JSON.parse(event.data);
      const message = messageObject.message;
      const senderId = messageObject.userId;
      const timestamp = messageObject.timestamp; // Obtém o timestamp

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

  const sendMessage = () => {
    if (input.trim() && socket && socket.readyState === WebSocket.OPEN) {
      const messageObject = {
        message: input,
        userId,
        timestamp: new Date().toISOString(), // Adiciona o timestamp
      };
      socket.send(JSON.stringify(messageObject));
      setInput('');
    }
  };


  return (
    <div className="flex flex-col bg-zinc-950 p-2 my-2 rounded-xl">
      <div className='h-96 w-full overflow-y-auto'>
        {messages.map((msg, index) => {
          const formattedTime = format(new Date(msg.timestamp), 'HH:mm');
          return (
            <div key={index} className={`flex my-2 px-3 py-2 rounded-xl w-fit max-w-96 h-fit flex-wrap items-center ${msg.senderId === userId ? 'bg-green-600 text-black self-end' : 'bg-gray-600 text-white self-start'}`}>
              {msg.message}
              <p className="flex text-white text-[13px] ml-2">{formattedTime}</p>
            </div>
          );
        })}
      </div>
      <div className="flex items-end pt-2">
        <input
          type="text"
          value={input}
          placeholder='Mensagem'
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="w-96 h-11 px-5 py-3 border-2 border-green-600 rounded-l-full"
        />
        <button className="bg-green-600 hover:bg-green-700 h-11 w-16 rounded-r-full text-white flex justify-center items-center" onClick={sendMessage}>
          <span className="material-symbols-outlined">
            send
          </span>
        </button>
      </div>
    </div>
  );
  // return (
  //   <div className="flex flex-col bg-zinc-950 p-2 my-2 rounded-xl">
  //     <div className='h-96 w- overflow-y-auto'>
  //       {messages.map((msg, index) => (
  //         <div key={index} className='flex my-2 px-3 py-2 rounded-xl w-fit max-w-96 h-fit flex-wrap items-center justify-end break-all bg-green-600 text-black'>
  //           {msg.message}
  //           <p className="flex text-white text-[13px] ml-2">{formattedTime}</p>
  //         </div>
  //       ))}
  //     </div>
  //     <div className="flex items-end pt-2">
  //       <input
  //         type="text"
  //         value={input}
  //         placeholder='Mensagem'
  //         onChange={(e) => setInput(e.target.value)}
  //         onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
  //         className="w-96 h-11 px-5 py-3 border-2 border-green-600 rounded-l-full"
  //       />
  //       <button className="bg-green-600 hover:bg-green-700 h-11 w-16 rounded-r-full text-white flex justify-center items-center" onClick={sendMessage}>
  //         <span className="material-symbols-outlined">
  //           send
  //         </span>
  //       </button>
  //     </div>
  //   </div>
  // );
};

export default Chat;