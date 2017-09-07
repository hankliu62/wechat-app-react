import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import App from '../containers/App/App';
import Container from '../containers/Container/Container';
import Bundle from '../components/Bundle';

const loadLoginAsync = () => import(/* webpackChunkName: 'containers/Login/Login' */ '../containers/Login/Login');
const loadSignUpAsync = () => import(/* webpackChunkName: 'containers/SignUp/SignUp' */ '../containers/SignUp/SignUp');
const loadHomepageAsync = () => import(/* webpackChunkName: 'containers/Homepage/Homepage' */ '../containers/Homepage/Homepage');
const loadCertificateAsync = () => import(/* webpackChunkName: 'containers/Certificate/Certificate' */ '../containers/Certificate/Certificate');

const BundleWrappingRoute = ({ load, ...rest }) => (
  <Route {...rest} render={props => (<Bundle load={load}>{InnerComponent => <InnerComponent {...props} />}</Bundle>)} />
);

// 根路由
const AppRouter = () => (
  <Container>
    <Switch>
      <Redirect exact from="/" to="/homepage" />
      <BundleWrappingRoute exact path="/login" load={loadLoginAsync} />
      <BundleWrappingRoute exact path="/signup" load={loadSignUpAsync} />
      <App>
        <BundleWrappingRoute path="/homepage" load={loadHomepageAsync} />
        <BundleWrappingRoute path="/cert" load={loadCertificateAsync} />
      </App>
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
