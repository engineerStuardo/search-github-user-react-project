import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Dashboard></Dashboard>
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
