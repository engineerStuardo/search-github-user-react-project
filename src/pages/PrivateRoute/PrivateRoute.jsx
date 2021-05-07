import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({ children, path, ...rest }) => {
  const { isAuthenticated, user } = useAuth0();
  const isUser = isAuthenticated && user;

  return path === '/' ? (
    <Route
      {...rest}
      render={() => (isUser ? children : <Redirect to='/login' />)}
    />
  ) : (
    <Route
      {...rest}
      render={() => (!isUser ? children : <Redirect to='/' />)}
    />
  );
};
export default PrivateRoute;
