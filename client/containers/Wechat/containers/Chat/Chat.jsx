import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectAdvanced } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import WeuiHeader from '../../components/WeuiHeader/WeuiHeader';
import WeuiSearchBar from '../../components/WeuiSearchBar/WeuiSearchBar';
import WeuiChatRooms from '../../components/WeuiChatRooms/WeuiChatRooms';
import CheckRoute from '../../decorators/CheckRoute';
import * as chatActions from '../../actions/chat';
import ObjectUtils from '../../../../utils/ObjectUtils';

import './Chat.less';

@CheckRoute
class Chat extends Component {
  static propTypes = {
    chats: PropTypes.array,
    chatRooms: PropTypes.array,
    fetchChats: PropTypes.func.isRequired
  }

  componentDidMount() {
    if (!this.props.chats) {
      this.props.fetchChats();
    }
  }

  render() {
    const { children, chatRooms, chats } = this.props;

    if (!chats) {
      return null;
    }

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

const selectorFactory = (dispatch) => {
  let result = {};

  const chatDispatchActions = bindActionCreators(chatActions, dispatch);
  return (nextState, nextOwnProps) => {
    const { chatMain = {} } = nextState.wechat;
    const { chats, chatRooms } = chatMain;

    const nextResult = {
      ...nextOwnProps,
      chats,
      chatRooms,
      ...chatDispatchActions
    };
    result = ObjectUtils.shallowEqual(result, nextResult) ? result : nextResult;
    return result;
  };
};

export default connectAdvanced(selectorFactory)(Chat);
