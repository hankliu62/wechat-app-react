import React from 'react';

import WeuiChatRoom from '../WeuiChatRoom/WeuiChatRoom';

import './WeuiChatRooms.less';

const WeuiChatRooms = props => (
  <div className="weui-chat-rooms">
    {
      props.chatRooms && props.chatRooms.map((item, index) => (<WeuiChatRoom key={index} {...item} />))
    }
  </div>
);

export default WeuiChatRooms;
