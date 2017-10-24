import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectAdvanced } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';
import * as Constants from '../../../../constants/Constants';
import * as chatActions from '../../../../actions/chat';
import * as selfActions from '../../../../actions/self';
import ObjectUtils from '../../../../../../utils/ObjectUtils';

import './Dialogue.less';

class Dialogue extends Component {
  static propTypes = {
    personal: PropTypes.object,
    messagesCache: PropTypes.object,
    currentChat: PropTypes.object,
    fetchChat: PropTypes.func.isRequired,
    fetchMessages: PropTypes.func.isRequired,
    fetchPersonal: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      inputType: 'txt'
    };
  }

  componentDidMount() {
    const { match, messagesCache } = this.props;
    const mid = match.params.mid;
    this.props.fetchChat(mid);

    if (!messagesCache[mid]) {
      this.props.fetchMessages(mid);
    }

    if (!this.props.personal) {
      this.props.fetchPersonal();
    }
  }

  handleToggleInputType = () => {
    if (this.state.inputType === 'txt') {
      this.setState({ inputType: 'voice' });
    } else {
      this.setState({ inputType: 'txt' });
    }
  }

  getTitle = (currentChat) => {
    switch (currentChat.base.type) {
      case Constants.CHAT_ROOM_TYPE_FRIENDS:
        return currentChat.base.nickname || currentChat.base.name;
      case Constants.CHAT_ROOM_TYPE_GROUP:
        return `${currentChat.base.nickname || currentChat.base.name}(${currentChat.chatMemberModel.length})`;
      case Constants.CHAT_ROOM_TYPE_SERVICE:
        return currentChat.base.name;
    }

    return '';
  }

  renderChatMessage = (message, index) => {
    const { currentChat, personal = {} } = this.props;
    const { concat, type = '', content } = message;

    return (
      <div className="chat-row-wrap" key={index}>
        <div className={classNames('chat-row-wrap-avatar left', { 'visibility-hidden': personal.wxid === concat.wxid })}>
          <img className="chat-concat-avatar" src={concat.headerUrl} />
        </div>
        <div className={classNames('chat-row-wrap-body', `${type.toLowerCase()}-chat-body`, { personal: personal.wxid === concat.wxid, })}>
          {
            currentChat && currentChat.base.type === Constants.CHAT_ROOM_TYPE_GROUP && currentChat.chatMemberModel && currentChat.chatMemberModel.length &&
              <div className="chat-concat-name">{ concat.remark || concat.nickname }</div>
          }
          <div className="wrap-body-content">
            { type === 'TEXT' && content }
            { type === 'IMAGE' && <img className="content-image" src={content} /> }
          </div>
        </div>
        <div className={classNames('chat-row-wrap-avatar right', { 'visibility-hidden': personal.wxid !== concat.wxid })}>
          <img className="chat-concat-avatar" src={concat.headerUrl} />
        </div>
      </div>
    );
  }

  render() {
    const { currentChat, match, messagesCache } = this.props;
    const { inputType } = this.state;

    if (!currentChat || currentChat.mid !== match.params.mid) {
      return null;
    }

    const messages = messagesCache[match.params.mid] || [];

    return (
      <div className="chat-dialogue-wrapper">
        <WeuiHeader title={this.getTitle(currentChat)} back={(<WeuiBack history={this.props.history}><span className="weui-back-centent">微信</span></WeuiBack>)} />

        <div className="dialogue-content">
          <div className="dialogue-content-body">
            { messages.map(this.renderChatMessage) }
          </div>
          <div className="dialogue-content-footer">
            <i
              className={classNames('iconfont', { 'icon-dialogue-jianpan': inputType === 'txt', 'icon-dialogue-voice': inputType === 'voice' })}
              onClick={this.handleToggleInputType}
            />
            <div className="chat-way">
              { inputType === 'txt' && <input className="weui-form-control" type="text" /> }
              { inputType === 'voice' && <p className="chat-say">按住 说话</p> }
            </div>
            <i className="expression iconfont icon-dialogue-smile" />
            <i className="more iconfont icon-dialogue-jia" />
          </div>
        </div>
      </div>
    );
  }
}

const selectorFactory = (dispatch) => {
  let result = {};

  const chatDispatchActions = bindActionCreators(chatActions, dispatch);
  const selfDispatchActions = bindActionCreators(selfActions, dispatch);
  return (nextState, nextOwnProps) => {
    const chatMain = nextState.wechat.chatMain || {};
    const selfMain = nextState.wechat.selfMain || {};
    const { personal } = selfMain;
    const { currentChat, messages: messagesCache } = chatMain;

    const nextResult = {
      ...nextOwnProps,
      personal,
      currentChat,
      messagesCache,
      ...chatDispatchActions,
      ...selfDispatchActions
    };
    result = ObjectUtils.shallowEqual(result, nextResult) ? result : nextResult;
    return result;
  };
};

export default connectAdvanced(selectorFactory)(Dialogue);
