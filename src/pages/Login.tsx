import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store';
import { logIn } from '../store/actions/auth';

const StyledLogin = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    width: 50rem;
    height: 20rem;
    text-align: center;

    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;
  }

  p {
    font-size: 2rem;
  }

  button {
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    border-radius: 5px;
    padding: 1.5rem 4rem;
    font-family: inherit;
    background: rgb(var(--border-blue));
  }
`;

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    if (isLoggedIn) {
      history.push('/shapes');
    }
  }, [isLoggedIn]);

  function handleLogin() {
    localStorage.setItem('token', 'token');
    dispatch(logIn());
    history.push('/shapes');
  }

  return (
    <StyledLogin>
      <div className="content">
        <p>Click the button to Login</p>
        <button onClick={handleLogin} type="button" role="button">
          Log in
        </button>
      </div>
    </StyledLogin>
  );
}
