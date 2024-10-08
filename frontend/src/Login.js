import React, { useState } from 'react';
import "./App.css"

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="login-container flex flex-col items-center text-center w-[300px]">
        <p className="text-greetings text-white">Bem vindo ao chat room!</p>
          <p className="text-greetings text-white mb-3">Se identifique para continuar ★</p>
        <div className="flex items-end pt-2">
            <input
                type="text"
                placeholder="Seu nome aqui!"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-login h-11 px-5 py-3 border-2 border-teal-500 text-white bg-gray-900 bg-opacity-30 backdrop-blur-sm rounded-l-full"
            />
            <button onClick={handleLogin} className="btn-login w-12 bg-teal-500 hover:bg-teal-600 h-11 rounded-r-full text-white flex justify-center items-center">
                <span className="material-symbols-outlined">
                    arrow_forward
                </span>
            </button>
        </div>
    </div>
  );
};

export default Login;
