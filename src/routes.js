import React from 'react';
import {
  Switch, Route, Redirect, HashRouter,
} from 'react-router-dom';
import Wrapper from './components/wrapper/wrapper';
import Register from './pages/register';
import UserInfo from './pages/userInfo';

const Routes = () => {
  const Wrap = (Component, props) => {
    const { match } = props;
    return (
      <Wrapper match={match}>
        <Component {...props} />
      </Wrapper>
    );
  };

  return (
    <HashRouter basename="/">
      <Switch>
        <Redirect exact from="/" to="/register" />
        <Route path="/register" render={(props) => Wrap(Register, props)} />
        <Route path="/user-info" render={(props) => Wrap(UserInfo, props)} />
      </Switch>
    </HashRouter>
  );
};

export default Routes;
