import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logOut } from '../store/actions/auth';
import { ReactComponent as LogoutIcon } from '../assets/svgs/logout.svg';

const StyledNav = styled.nav`
  width: 100vw;
  height: fit-content;
  background: white;

  .content {
    display: flex;
    justify-content: space-between;
    width: var(--page-width);
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
  const dispatch = useDispatch();

  function handleLogout() {
    localStorage.removeItem('token');
    dispatch(logOut());
    history.push('/');
  }

  return (
    <StyledNav>
      <div className="content">
        <h1 role="heading">SHAPES</h1>
        <button onClick={handleLogout} type="button" role="button">
          Logout <LogoutIcon />
        </button>
      </div>
    </StyledNav>
  );
}
