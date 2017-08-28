import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import App from '../containers/App/App.jsx';
import Container from '../containers/Container/Container.jsx';
import Homepage from '../containers/Homepage/Homepage.jsx';
import Login from '../containers/Login/Login.jsx';
import SignUp from '../containers/SignUp/SignUp.jsx';
import Certificate from '../containers/Certificate/Certificate.jsx';

// const checkIsLogin = (props, pathname = '/homepage') => {
//   const isLogin = true;
//   return isLogin ? (
//     <Redirect to={ pathname } />
//   ) : (
//     <Redirect to='/login' />
//   );
// }

// 为什么不行啊？
const AppWrappingRoute = ({ component: Component, ...rest }) => (
  <Route { ...rest } render={ props => (<App><Component { ...props } /></App>) } />
);

export default () => (
  <Container>
    <AppWrappingRoute exact path="/" component={ Homepage } />
    <AppWrappingRoute path="/homepage" component={ Homepage } />
    <AppWrappingRoute path="/cert" component={ Certificate } />
    {/* <Route exact path="/" component={ Homepage } />
    <Route path="/homepage" component={ Homepage } /> */}
    <Route path="/login" component={ Login } />
    <Route path="/signup" component={ SignUp } />
  </Container>
);
