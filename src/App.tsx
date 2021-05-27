import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';

import { store } from './store';
import Login from './pages/Login';
import Shapes from './pages/Shapes';
import GlobalStyles from './styles/GlobalStyles';

import './App.css';

interface ProtectedRouteProps {
  path: string;
  exact?: boolean;
  isLoggedIn: boolean;
  component: React.ComponentType;
}

function ProtectedRoute({
  path,
  exact,
  component,
  isLoggedIn,
}: ProtectedRouteProps) {
  if (!isLoggedIn) return <Redirect to="/" />;
  return <Route path={path} exact={exact} component={component} />;
}

function App() {
  const [loading, setLoading] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
    setLoading(false);
  }, [loading]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Provider store={store}>
          <GlobalStyles />
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Login} />
              <ProtectedRoute
                path="/shapes"
                component={Shapes}
                isLoggedIn={isLoggedIn}
              />
            </Switch>
          </BrowserRouter>
        </Provider>
      )}
    </>
  );
}

export default App;
