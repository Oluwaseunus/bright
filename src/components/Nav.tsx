import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { ReactComponent as LogoutIcon } from '../assets/svgs/logout.svg';

const StyledNav = styled.nav`
  width: 100vw;
  height: fit-content;
  background: white;

  .content {
    display: flex;
    justify-content: space-between;
    width: 75%;
    margin: auto;
  }

  button {
    border: none;
    width: 10rem;
    display: flex;
    color: #f89692;
    cursor: pointer;
    background: none;
    font-size: 1.6rem;
    align-items: center;
    font-family: inherit;
    justify-content: space-around;

    svg {
      width: 2rem;
      height: 2rem;
      fill: #f89692;
    }
  }
`;

export default function Nav() {
  const history = useHistory();

  function handleLogout() {
    localStorage.removeItem('token');
    history.push('/');
  }

  return (
    <StyledNav>
      <div className="content">
        <h1>SHAPES</h1>
        <button onClick={handleLogout} type="button">
          Logout <LogoutIcon />
        </button>
      </div>
    </StyledNav>
  );
}
