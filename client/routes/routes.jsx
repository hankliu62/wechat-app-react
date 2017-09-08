import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import App from '../containers/App/App';
import Container from '../containers/Container/Container';
import BundleWrappingRoute from '../components/BundleWrappingRoute/BundleWrappingRoute';
import WechatContainer from '../containers/Wechat/Index';

const loadLoginAsync = () => import(/* webpackChunkName: 'containers/Login' */ '../containers/Login/Login');
const loadSignUpAsync = () => import(/* webpackChunkName: 'containers/SignUp' */ '../containers/SignUp/SignUp');
const loadHomepageAsync = () => import(/* webpackChunkName: 'containers/Homepage' */ '../containers/Homepage/Homepage');
const loadCertificateAsync = () => import(/* webpackChunkName: 'containers/Certificate' */ '../containers/Certificate/Certificate');
const loadNotFountAsync = () => import(/* webpackChunkName: 'containers/Error/NotFount' */ '../containers/Error/NotFount');

// 根路由
const AppRouter = () => {
  return (
    <Container>
      <Switch>
        <Redirect exact from="/" to="/homepage" />
        <BundleWrappingRoute exact path="/login" load={loadLoginAsync} />
        <BundleWrappingRoute exact path="/signup" load={loadSignUpAsync} />
        <BundleWrappingRoute exact path="/homepage" component={App} load={loadHomepageAsync} />
        <BundleWrappingRoute exact path="/cert" component={App} load={loadCertificateAsync} />
        {/* <BundleWrappingRoute path="/wechat" load={loadWechatAsync} /> // 注：不能使用这种coding split的方式加载子模块，除非子模块只是一个单页面，否则路由改变是页面不会渲染 */}
        <Route path="/wechat" render={nextProps => (<WechatContainer {...nextProps} />)} />
        <BundleWrappingRoute load={loadNotFountAsync} />
      </Switch>
    </Container>
  );
};

// const checkIsLogin = (props, pathname = '/homepage') => {
//   const isLogin = true;
//   return isLogin ? (
//     <Redirect to={ pathname } />
//   ) : (
//     <Redirect to='/login' />
//   );
// }

export default AppRouter;
