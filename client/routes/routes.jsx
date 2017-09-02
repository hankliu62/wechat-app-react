import React from 'react';
import { Route } from 'react-router-dom';

import App from '../containers/App/App';
import Container from '../containers/Container/Container';
import Homepage from '../containers/Homepage/Homepage';
import Login from '../containers/Login/Login';
import SignUp from '../containers/SignUp/SignUp';
import Certificate from '../containers/Certificate/Certificate';

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
  <Route {...rest} render={props => (<App><Component {...props} /></App>)} />
);

export default () => (
  <Container>
    <AppWrappingRoute exact path="/" component={Homepage} />
    <AppWrappingRoute path="/homepage" component={Homepage} />
    <AppWrappingRoute path="/cert" component={Certificate} />
    {/* <Route exact path="/" component={ Homepage } />
    <Route path="/homepage" component={ Homepage } /> */}
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />
  </Container>
);
