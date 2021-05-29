import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

import Login from '../../pages/Login';
import { render, screen, fireEvent } from '../../test-utils';

describe('Login page', () => {
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
    render(<Login />);
    const linkElement = screen.getByText(/Click the button to login/i);
    expect(linkElement).toBeInTheDocument();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/log in/i);
  });

  it('logs the user in', () => {
    const history = createMemoryHistory();

    const historyMock = {
      ...history,
      push: jest.fn(),
    };

    render(
      <Router history={historyMock}>
        <Login />
      </Router>
    );

    fireEvent.click(screen.getByText(/log in/i));
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(historyMock.push).toHaveBeenCalled();
  });
});
