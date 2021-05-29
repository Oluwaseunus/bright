import { MemoryRouter } from 'react-router-dom';

import App from './App';
import { render, screen, fireEvent } from './test-utils';

describe('App', () => {
  it('renders login page', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const linkElement = screen.getByText(/Click the button to login/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('renders shapes page on the shapes route', () => {
    render(
      <MemoryRouter initialEntries={['/shapes']}>
        <App />
      </MemoryRouter>
    );
  });

  it('navigates to shapes page on login', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/click the button to login/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/shapes/i)).toBeInTheDocument();
  });

  it('renders shapes page if token is found on load', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn().mockReturnValue('test'),
      },
    });

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(localStorage.getItem).toHaveBeenCalled();
    expect(screen.getByText(/shapes/i)).toBeInTheDocument();
  });
});
