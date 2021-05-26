import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();

  function handleLogin() {
    localStorage.setItem('token', 'token');
    history.push('/shapes');
  }

  return (
    <div>
      <p>Click here to Login</p>
      <button onClick={handleLogin} type="button">
        Log in
      </button>
    </div>
  );
}
