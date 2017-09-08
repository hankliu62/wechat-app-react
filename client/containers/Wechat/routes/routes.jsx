import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import BundleWrappingRoute from '../../../components/BundleWrappingRoute/BundleWrappingRoute';

const loadHomepageAsync = () => import(/* webpackChunkName: 'containers/Wechat/Homepage' */ '../containers/Homepage/Homepage');
const loadContactAsync = () => import(/* webpackChunkName: 'containers/Wechat/Contact' */ '../containers/Contact/Contact');
const loadExploreAsync = () => import(/* webpackChunkName: 'containers/Wechat/Explore' */ '../containers/Explore/Explore');
const loadSelfAsync = () => import(/* webpackChunkName: 'containers/Wechat/Self' */ '../containers/Self/Self');

const WechatRouter = (props) => {
  return (
    <Switch>
      <Redirect exact from="/wechat" to="/wechat/homepage" />
      <BundleWrappingRoute exact {...props} path="/wechat/homepage" load={loadHomepageAsync} />
      <BundleWrappingRoute exact {...props} path="/wechat/contact" load={loadContactAsync} />
      <BundleWrappingRoute exact {...props} path="/wechat/explore" load={loadExploreAsync} />
      <BundleWrappingRoute exact {...props} path="/wechat/self" load={loadSelfAsync} />
    </Switch>
  );
};

export default WechatRouter;
