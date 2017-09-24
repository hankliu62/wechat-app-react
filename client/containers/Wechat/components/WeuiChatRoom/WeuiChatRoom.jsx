import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import WeuiChatAvatar from '../WeuiChatAvatar/WeuiChatAvatar';
import WeuiBadge from '../WeuiBadge/WeuiBadge';
import { CHAT_ROOM_TYPE_GROUP, CHAT_ROOM_TYPE_FRIENDS, CHAT_ROOM_TYPE_SERVICE } from '../../constants/Constants';
import WechatTimeUtil from '../../utils/WechatTimeUtil';
import BindSwiper from '../../decorators/BindSwiper';

import './WeuiChatRoom.less';

@BindSwiper('3.9rem')
class WeuiChatRoom extends Component {
  static propTypes = {
    restoreSymbol: PropTypes.symbol,
    onSwiperExpand: PropTypes.func
  }

  static defaultProps = {
    onSwiperExpand: () => {}
  }

  constructor(props) {
    super(props);

    this.bindSwiper = this.bindSwiper.bind(this);
    this.unbindSwiper = this.unbindSwiper.bind(this);
    this.restoreSwiper = this.restoreSwiper.bind(this);
  }

  componentDidMount() {
    const { handleTouchstart, handleTouchmove, handleTouchend } = this.bindSwiper(this.chatRoomWrapper, this.handleSwiperExpand);
    this.handleTouchstart = handleTouchstart;
    this.handleTouchmove = handleTouchmove;
    this.handleTouchend = handleTouchend;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.restoreSymbol !== nextProps.restoreSymbol) {
      this.restoreSwiper(this.chatRoomWrapper);
    }
  }

  componentWillUnmount() {
    if (this.handleTouchstart || this.handleTouchmove || this.handleTouchend) {
      this.unbindSwiper(this.chatRoomWrapper, this.handleTouchstart, this.handleTouchmove, this.handleTouchend);
      this.handleTouchstart = null;
      this.handleTouchmove = null;
      this.handleTouchend = null;
    }
  }

  handleSwiperExpand = () => {
    this.props.onSwiperExpand();
  }

  renderAvatar = () => {
    const { type, headerImages } = this.props;

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
    let mark = '标为未读';
    if (unreadCount) {
      mark = '标为已读';
    }
    if (type === CHAT_ROOM_TYPE_SERVICE) {
      mark = '取消关注';
    }
    return (
      <Link to={link || ''} className={classNames('weui-chat-room', { [`chat-room-${type}`]: !!type })}>
        <div className="weui-chat-room-info" ref={el => this.chatRoomWrapper = el}>
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

        <div className="weui-chat-room-operate">
          <div className="operate-mark">{mark}</div>
          <div className="operate-del">删除</div>
        </div>
      </Link>
    );
  }
}

export default WeuiChatRoom;
