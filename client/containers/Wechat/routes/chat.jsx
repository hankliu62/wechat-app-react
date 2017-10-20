import React from 'react';
import { Switch } from 'react-router-dom';

import BundleWrappingRoute from '../../../components/BundleWrappingRoute/BundleWrappingRoute';
import SubPageContainer from '../containers/SubPageContainer/SubPageContainer';

const WechatChatRouter = (props) => {
  const loadChatDialogueAsync = () => import(/* webpackChunkName: 'containers/Wechat/Chat/Dialogue' */ '../containers/Chat/containers/Dialogue/Dialogue.jsx');

  return (
    <Switch>
      <BundleWrappingRoute {...props} component={SubPageContainer} path="/wechat/chat/dialogue/:mid" load={loadChatDialogueAsync} />
    </Switch>
  );
};

export default WechatChatRouter;
