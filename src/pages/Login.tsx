import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

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

  function handleLogin() {
    localStorage.setItem('token', 'token');
    history.push('/shapes');
  }

  return (
    <StyledLogin>
      <div className="content">
        <p>Click the button to Login</p>
        <button onClick={handleLogin} type="button">
          Log in
        </button>
      </div>
    </StyledLogin>
  );
}
