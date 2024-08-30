import React, { useState } from 'react';
import Login from './Login';
import Chat from './Chat';
import './App.css';

function App() {
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    setUsername(username);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="App w-screen h-screen flex justify-center items-center flex-wrap">
      <div> 
        <div className="bg-opacity-30 bg-black backdrop-blur-sm rounded-t-xl p-3 flex justify-between items-center">
          <h1 className="titulo-chat font-semibold text-white text-2xl ml-4">CHAT ROOM</h1>
          <span class="material-symbols-outlined flex justify-center items-center rounded-md cursor-pointer text-white bg-teal-300 bg-opacity-30 hover:bg-teal-700 w-8 h-8 mr-2" onClick={handleRefresh}>
              close
          </span>
        </div>
          <div className="area-chat flex flex-col items-center bg-opacity-30 bg-black backdrop-blur-sm px-5 pb-5 rounded-b-xl">
            {!username ? <Login onLogin={handleLogin} /> : <Chat username={username} />}
        </div>
      </div>
    </div>
  );
}

export default App;
