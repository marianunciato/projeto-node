import React from 'react';
import Chat from './Chat';
import './App.css';

function App() {
  return (
    <div className="App w-screen h-screen flex justify-center items-center flex-wrap">
      <div className="area-chat flex flex-col items-center bg-opacity-30 bg-black backdrop-blur-sm p-5 rounded-xl">
        <h1 className="titulo-chat font-semibold text-white text-3xl">CHAT DA DUDA</h1>
        <Chat />
      </div>
    </div>
  );
}

export default App;

