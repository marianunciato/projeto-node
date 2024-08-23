import React from 'react';
import Chat from './Chat';

function App() {
  return (
    <div className="App bg-pink-200 w-screen h-screen flex justify-center items-center flex-wrap">
      <div className="flex flex-col items-center">
        <h1 className="font-semibold text-3xl">Chat Application</h1>
        <Chat />
      </div>
    </div>
  );
}

export default App;
