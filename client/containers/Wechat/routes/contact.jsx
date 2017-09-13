import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import BundleWrappingRoute from '../../../components/BundleWrappingRoute/BundleWrappingRoute';
import Detail from '../containers/Contact/containers/Detail/Detail';
import Tags from '../containers/Contact/containers/Tags/Tags';

// const loadContactDetailAsync = () => import(/* webpackChunkName: 'containers/Wechat/Contact/Detail' */ '../containers/Contact/containers/Detail/Detail.jsx');
// const loadContactTagsAsync = () => import(/* webpackChunkName: 'containers/Wechat/Contact/Tags' */ '../containers/Contact/containers/Tags/Tags.jsx');

// <Route path="/wechat/contact/detail" render={nextProps => (<Detail {...nextProps} />)} />
// <BundleWrappingRoute {...props} path="/wechat/contact/detail" load={loadContactDetailAsync} />
const WechatContactRouter = (props) => {
  console.log(props, 'WechatContactRouter');
  return (
    <div className="contact-sub-wrapper">
      <Switch>
        <Route {...props} path="/wechat/contact/detail" render={nextProps => (<Detail {...nextProps} />)} />
        <Route {...props} path="/wechat/contact/tags" render={nextProps => (<Tags {...nextProps} />)} />
      </Switch>
    </div>
  );
};

export default WechatContactRouter;
