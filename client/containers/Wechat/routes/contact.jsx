import React from 'react';
import { Switch } from 'react-router-dom';


import BundleWrappingRoute from '../../../components/BundleWrappingRoute/BundleWrappingRoute';
import SubPageContainer from '../containers/SubPageContainer/SubPageContainer';

// import Detail from '../containers/Contact/containers/Detail/Detail';
// import Tags from '../containers/Contact/containers/Tags/Tags';
// <Route {...props} path="/wechat/contact/tags" render={nextProps => (<Tags {...nextProps} />)} />
// <Route {...props} path="/wechat/contact/detail" render={nextProps => (<Detail {...nextProps} />)} />

const WechatContactRouter = (props) => {
  const loadContactDetailAsync = () => import(/* webpackChunkName: 'containers/Wechat/Contact/Detail' */ '../containers/Contact/containers/Detail/Detail.jsx');
  const loadContactTagsAsync = () => import(/* webpackChunkName: 'containers/Wechat/Contact/Tags' */ '../containers/Contact/containers/Tags/Tags.jsx');
  const loadContactNewFriendsAsync = () => import(/* webpackChunkName: 'containers/Wechat/Contact/NewFriends' */ '../containers/Contact/containers/NewFriends/NewFriends.jsx');
  const loadContactGroupChatsAsync = () => import(/* webpackChunkName: 'containers/Wechat/Contact/GroupChats' */ '../containers/Contact/containers/GroupChats/GroupChats.jsx');
  const loadContactOfficialAccountsAsync = () => import(/* webpackChunkName: 'containers/Wechat/Contact/OfficialAccounts' */ '../containers/Contact/containers/OfficialAccounts/OfficialAccounts.jsx');

  return (
    <Switch>
      <BundleWrappingRoute {...props} component={SubPageContainer} path="/wechat/contact/detail/:wxid" load={loadContactDetailAsync} />
      <BundleWrappingRoute {...props} component={SubPageContainer} path="/wechat/contact/detail" load={loadContactDetailAsync} />
      <BundleWrappingRoute {...props} component={SubPageContainer} path="/wechat/contact/tags" load={loadContactTagsAsync} />
      <BundleWrappingRoute {...props} component={SubPageContainer} path="/wechat/contact/new-friends" load={loadContactNewFriendsAsync} />
      <BundleWrappingRoute {...props} component={SubPageContainer} path="/wechat/contact/group-chats" load={loadContactGroupChatsAsync} />
      <BundleWrappingRoute {...props} component={SubPageContainer} path="/wechat/contact/official-accounts" load={loadContactOfficialAccountsAsync} />
    </Switch>
  );
};

export default WechatContactRouter;
