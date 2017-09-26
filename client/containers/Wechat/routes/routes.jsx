import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import BundleWrappingRoute from '../../../components/BundleWrappingRoute/BundleWrappingRoute';
// import Contact from '../containers/Contact/Contact';
import ContactRoutes from './contact';
import SelfRoutes from './self';
import ExploreRoutes from './explore';
import ToolsRoutes from './tools';

const loadChatAsync = () => import(/* webpackChunkName: 'containers/Wechat/Chat' */ '../containers/Chat/Chat');
const loadAddFriendAsync = () => import(/* webpackChunkName: 'containers/Wechat/AddFriend' */ '../containers/AddFriend/AddFriend');
// <Route path="/wechat/contact" render={nextProps => (<Contact {...nextProps}><ContactRoute /></Contact>)} />
const WechatRouter = (props) => {
  const loadContactAsync = () => import(/* webpackChunkName: 'containers/Wechat/Contact' */ '../containers/Contact/Contact');
  const loadSelfAsync = () => import(/* webpackChunkName: 'containers/Wechat/Self' */ '../containers/Self/Self');
  const loadExploreAsync = () => import(/* webpackChunkName: 'containers/Wechat/Explore' */ '../containers/Explore/Explore');
  const loadToolsAsync = () => import(/* webpackChunkName: 'containers/Wechat/Tools' */ '../containers/Tools/Tools');

  return (
    <Switch>
      <Redirect exact from="/wechat" to="/wechat/chat" />
      <BundleWrappingRoute {...props} path="/wechat/chat" load={loadChatAsync} />
      <BundleWrappingRoute {...props} path="/wechat/contact" load={loadContactAsync}>
        {
          nextProps => <ContactRoutes {...nextProps} />
        }
      </BundleWrappingRoute>
      <BundleWrappingRoute {...props} path="/wechat/explore" load={loadExploreAsync}>
        {
          nextProps => <ExploreRoutes {...nextProps} />
        }
      </BundleWrappingRoute>
      <BundleWrappingRoute {...props} path="/wechat/self" load={loadSelfAsync}>
        {
          nextProps => <SelfRoutes {...nextProps} />
        }
      </BundleWrappingRoute>
      <BundleWrappingRoute {...props} path="/wechat/add-friend" load={loadAddFriendAsync} />
      <BundleWrappingRoute {...props} path="/wechat/tools" load={loadToolsAsync}>
        {
          nextProps => <ToolsRoutes {...nextProps} />
        }
      </BundleWrappingRoute>
    </Switch>
  );
};

export default WechatRouter;
