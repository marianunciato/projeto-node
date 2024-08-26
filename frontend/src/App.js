import React from 'react';
import Chat from './Chat';
import './App.css';

function App() {
  return (
    <div className="App w-screen h-screen flex justify-center items-center flex-wrap">
      <div className="flex flex-col items-center bg-opacity-60 bg-black backdrop-blur-sm p-5 rounded-xl">
        <h1 className="font-semibold text-white text-3xl">Chat da Duda</h1>
        <Chat />
      </div>
    </div>
  );
}

export default App;

