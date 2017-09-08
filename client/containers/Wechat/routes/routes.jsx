import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import BundleWrappingRoute from '../../../components/BundleWrappingRoute/BundleWrappingRoute';

const loadChatAsync = () => import(/* webpackChunkName: 'containers/Wechat/Chat' */ '../containers/Chat/Chat');
const loadContactAsync = () => import(/* webpackChunkName: 'containers/Wechat/Contact' */ '../containers/Contact/Contact');
const loadExploreAsync = () => import(/* webpackChunkName: 'containers/Wechat/Explore' */ '../containers/Explore/Explore');
const loadSelfAsync = () => import(/* webpackChunkName: 'containers/Wechat/Self' */ '../containers/Self/Self');

const WechatRouter = (props) => {
  return (
    <Switch>
      <Redirect exact from="/wechat" to="/wechat/chat" />
      <BundleWrappingRoute {...props} path="/wechat/chat" load={loadChatAsync} />
      <BundleWrappingRoute {...props} path="/wechat/contact" load={loadContactAsync} />
      <BundleWrappingRoute {...props} path="/wechat/explore" load={loadExploreAsync} />
      <BundleWrappingRoute {...props} path="/wechat/self" load={loadSelfAsync} />
    </Switch>
  );
};

export default WechatRouter;
