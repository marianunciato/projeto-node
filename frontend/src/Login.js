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
    <div className="login-container flex flex-col items-center text-center">
        <p className="text-greetings text-black mt-1">Bem vindo ao meu chat!</p>
          <p className="text-greetings text-black mb-2">Se identifique para continuar.</p>
        <div className="flex items-end pt-2">
            <input
                type="text"
                placeholder="Seu nome aqui!"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-login h-9 px-3 py-2 border-2 border-blue-300 text-gray-600 bg-white rounded-sm"
            />
            <button onClick={handleLogin} className="btn-login bg-gray-100 border-2 hover:bg-gray-200 border-blue-500 ml-2 px-2 h-9 rounded-md text-black flex justify-center items-center">
                <p> Continuar </p>
            </button>
        </div>
    </div>
  );
};

export default Login;