import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import App from '../containers/App/App';
import Container from '../containers/Container/Container';
import Homepage from '../containers/Homepage/Homepage';
import Login from '../containers/Login/Login';
import SignUp from '../containers/SignUp/SignUp';
import Certificate from '../containers/Certificate/Certificate';

const AppWrappingRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (<App><Component {...props} /></App>)} />
);

// 根路由
const AppRouter = () => (
  <Container>
    <Switch>
      <Redirect exact from="/" to="/homepage" />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <AppWrappingRoute path="/homepage" component={Homepage} />
      <AppWrappingRoute path="/cert" component={Certificate} />
    </Switch>
  </Container>
);

// const checkIsLogin = (props, pathname = '/homepage') => {
//   const isLogin = true;
//   return isLogin ? (
//     <Redirect to={ pathname } />
//   ) : (
//     <Redirect to='/login' />
//   );
// }

export default AppRouter;
