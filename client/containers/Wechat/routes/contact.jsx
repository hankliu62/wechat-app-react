import React from 'react';
import { Switch } from 'react-router-dom';

import BundleWrappingRoute from '../../../components/BundleWrappingRoute/BundleWrappingRoute';
import Container from '../containers/Contact/containers/Container/Container';

// import Detail from '../containers/Contact/containers/Detail/Detail';
// import Tags from '../containers/Contact/containers/Tags/Tags';
// <Route {...props} path="/wechat/contact/tags" render={nextProps => (<Tags {...nextProps} />)} />
// <Route {...props} path="/wechat/contact/detail" render={nextProps => (<Detail {...nextProps} />)} />

const WechatContactRouter = (props) => {
  const loadContactDetailAsync = () => import(/* webpackChunkName: 'containers/Wechat/Contact/Detail' */ '../containers/Contact/containers/Detail/Detail.jsx');
  const loadContactTagsAsync = () => import(/* webpackChunkName: 'containers/Wechat/Contact/Tags' */ '../containers/Contact/containers/Tags/Tags.jsx');

  return (
    <Switch>
      <BundleWrappingRoute {...props} component={Container} path="/wechat/contact/detail/:wxid" load={loadContactDetailAsync} />
      <BundleWrappingRoute {...props} component={Container} path="/wechat/contact/tags" load={loadContactTagsAsync} />
    </Switch>
  );
};

export default WechatContactRouter;
