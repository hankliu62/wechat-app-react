import React, { Component } from 'react';
import classNames from 'classnames';

import WeuiHeader from '../../components/WeuiHeader/WeuiHeader';
import WeuiSearchBar from '../../components/WeuiSearchBar/WeuiSearchBar';
import WeuiChatRooms from '../../components/WeuiChatRooms/WeuiChatRooms';
import CheckRoute from '../../decorators/CheckRoute';
import { CHAT_ROOM_TYPE_GROUP } from '../../constants/Constants';

import './Chat.less';

@CheckRoute
class Chat extends Component {
  render() {
    const { children } = this.props;
    const chatRooms = [
      {
        link: '/wechat/chat/dialogue',
        title: '收购淘宝讨论群',
        lastTime: 1505470665990,
        lastMessage: '我试一试',
        lastSpeaker: '夜华',
        mute: true,
        type: CHAT_ROOM_TYPE_GROUP
      }
    ];

    return (
      <div className={classNames('chat-wrapper', { 'with-sub-wrapper without-footer-wrapper': this.checkIsSubRoute() })}>
        <div className="chat-main-wrapper">
          <WeuiHeader title="微信">
            <i className="icon-header-operation iconfont icon-tips-jia" />
          </WeuiHeader>

          <WeuiSearchBar />

          <WeuiChatRooms chatRooms={chatRooms} />
        </div>

        { children && children }
      </div>
    );
  }
}

export default Chat;
