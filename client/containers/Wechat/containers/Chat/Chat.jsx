import React from 'react';

import WeuiHeader from '../../components/WeuiHeader/WeuiHeader';

import './Chat.less';

const Chat = () => {
  return (
    <div className="chat-wrapper">
      <WeuiHeader title="微信">
        <i className="icon-header-operation iconfont icon-tips-jia" />
      </WeuiHeader>
      Chat
    </div>
  );
};

export default Chat;
