import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';

function App() {
  return (
    <div>
      <Dashboard></Dashboard>
      <Login />
      <Error />
    </div>
  );
}

export default App;
