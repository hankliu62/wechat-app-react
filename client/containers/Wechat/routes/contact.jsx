import React from 'react';
import { Switch } from 'react-router-dom';

import BundleWrappingRoute from '../../../components/BundleWrappingRoute/BundleWrappingRoute';
// import Detail from '../containers/Contact/containers/Detail/Detail';

const loadContactDetailAsync = () => import(/* webpackChunkName: 'containers/Wechat/Contact/Detail' */ '../containers/Contact/containers/Detail/Detail.jsx');

// <Route path="/wechat/contact/detail" render={nextProps => (<Detail {...nextProps} />)} />
//
const WechatContactRouter = (props) => {
  console.log(props, 'WechatContactRouter');
  return (
    <Switch>
      <BundleWrappingRoute {...props} path="/wechat/contact/detail" load={loadContactDetailAsync} />
    </Switch>
  );
};

export default WechatContactRouter;
