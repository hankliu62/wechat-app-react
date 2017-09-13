import React from 'react';

import WcHeader from '../../components/WcHeader/WcHeader';

import './Chat.less';

const Chat = () => {
  return (
    <div className="chat-wrapper">
      <WcHeader title="微信">
        <i className="iconfont icon-tips-jia" />
      </WcHeader>
      Chat
    </div>
  );
};

export default Chat;
