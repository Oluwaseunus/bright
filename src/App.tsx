import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import { RootState } from './store';
import Shapes from './pages/Shapes';
import { logIn } from './store/actions/auth';
import GlobalStyles from './styles/GlobalStyles';

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
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const isLoggedIn = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) dispatch(logIn());
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <GlobalStyles />
          <Switch>
            <Route exact path="/" component={Login} />
            <ProtectedRoute
              path="/shapes"
              component={Shapes}
              isLoggedIn={isLoggedIn}
            />
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
