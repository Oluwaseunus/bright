import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Nav() {
  const history = useHistory();

  function handleLogout() {
    localStorage.removeItem('token');
    history.push('/');
  }

  return (
    <nav>
      <p>SHAPES</p>
      <button onClick={handleLogout} type="button">
        Logout
      </button>
    </nav>
  );
}
