import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import WeuiChatAvatar from '../WeuiChatAvatar/WeuiChatAvatar';
import WeuiBadge from '../WeuiBadge/WeuiBadge';
import { CHAT_ROOM_TYPE_GROUP, CHAT_ROOM_TYPE_FRIENDS, CHAT_ROOM_TYPE_SERVICE } from '../../constants/Constants';
import WechatTimeUtil from '../../utils/WechatTimeUtil';

import './WeuiChatRoom.less';

class WeuiChatRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true
    };
  }

  renderAvatar = () => {
    const { type, headerImages } = this.props;
    // const images = [
    //   'https://sinacloud.net/vue-wechat/images/headers/baiqian.jpg',
    //   'https://sinacloud.net/vue-wechat/images/headers/header01.png',
    //   'https://sinacloud.net/vue-wechat/images/headers/yehua.jpg',
    //   'https://sinacloud.net/vue-wechat/images/headers/liubei.jpg',
    //   'https://sinacloud.net/vue-wechat/images/album/guanyu/guanyu01.jpeg',
    //   'https://sinacloud.net/vue-wechat/images/headers/zhugeliang.jpg',
    //   'https://sinacloud.net/vue-wechat/images/headers/sunshangxiang.jpg',
    //   'https://sinacloud.net/vue-wechat/images/headers/sunquan.jpg',
    //   'https://sinacloud.net/vue-wechat/images/headers/huangyueying.jpg',
    //   'https://sinacloud.net/vue-wechat/images/headers/zhenji.jpg'
    // ];

    switch (type) {
      case CHAT_ROOM_TYPE_GROUP:
        return (<WeuiChatAvatar images={headerImages} />);
      case CHAT_ROOM_TYPE_FRIENDS:
        return (<WeuiChatAvatar images={headerImages} />);
      case CHAT_ROOM_TYPE_SERVICE:
        return (<WeuiChatAvatar images={headerImages} />);
    }
  }

  render() {
    const { link, title, lastTime, lastMessage, lastSpeaker, mute, type, unreadCount } = this.props;

    return (
      <Link to={link || ''} className={classNames('weui-chat-room', { [`chat-room-${type}`]: !!type })} >
        <div className="weui-chat-room-info">
          <div className="chat-info-avatar">
            { this.renderAvatar() }
            { !!+unreadCount && <WeuiBadge type="count" count={unreadCount} /> }
          </div>
          <div className="chat-info-content">
            <div className="content-header">
              <div className="header-title">{ title }</div>
              <div className="header-time">{ WechatTimeUtil.convertToRelativeTime(lastTime) }</div>
            </div>
            <div className="content-body">
              <div className="body-message">{ type === CHAT_ROOM_TYPE_GROUP ? `${lastSpeaker}: ` : '' }{ lastMessage }</div>
              <div className={classNames('body-mute iconfont icon-mute', { hidden: !mute })} />
            </div>
          </div>
        </div>

        <div className="weui-chat-room-operate hidden">
          <div className="operate-mark">标为未读</div>
          <div className="operate-del">删除</div>
        </div>
      </Link>
    );
  }
}

export default WeuiChatRoom;
