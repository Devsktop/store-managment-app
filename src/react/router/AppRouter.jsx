import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

// SCREENS
import Login from 'react/components/Login/Login';
import DataLoad from 'react/components/Login/DataLoad';
import UserRecover from 'react/components/UserRecover/UserRecover';
import Cart from 'react/components/Cart/Cart';
import Records from 'react/components/Records/Records';
import Stock from 'react/components/Stock/Stock';
import Maintenance from 'react/components/Maintenance/Maintenance';
import UsersTable from 'react/components/Maintenance/Users/UsersTable';

// Navigations
import Navigation from './Navigation';

const AppRouter = () => {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/load" component={DataLoad} />
        <Route exact path="/recover" component={UserRecover} />
        <Route exact path="/ventas" component={Cart} />
        <Route exact path="/registro" component={Records} />
        <Route exact path="/stock" component={Stock} />
        <Route exact path="/mantenimiento" component={Maintenance} />
        <Route exact path="/users" component={UsersTable} />
      </Switch>
      <Redirect exact from="/" to="/login" />
    </Router>
  );
};

export default AppRouter;
