import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="login-container flex items-end pt-2">
      <input
        type="text"
        placeholder="Oi, insira seu nome!"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input-username h-11 px-5 py-3 border-2 border-pink-500 text-white bg-gray-900 bg-opacity-30 backdrop-blur-sm rounded-l-full"
      />
      <button onClick={handleLogin} className="btn-login w-12 bg-pink-500 hover:bg-pink-600 h-11 rounded-r-full text-white flex justify-center items-center">
        <span className="material-symbols-outlined">
         arrow_forward
        </span>
      </button>
    </div>
  );
};

export default Login;