import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Nav from '../../components/Nav';
import { render, screen, fireEvent } from '../../test-utils';

describe('Nav', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
    });
  });

  it('renders successfully', () => {
    render(<Nav />);
    expect(screen.getByRole('heading')).toHaveTextContent(/shapes/i);
    expect(screen.getByRole('button')).toHaveTextContent(/logout/i);
  });

  it('logs the user out when the logout button is clicked', () => {
    const history = createMemoryHistory();

    const historyMock = {
      ...history,
      push: jest.fn(),
    };

    render(
      <Router history={historyMock}>
        <Nav />
      </Router>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(localStorage.removeItem).toHaveBeenCalled();
    expect(historyMock.push).toHaveBeenCalled();
  });
});
