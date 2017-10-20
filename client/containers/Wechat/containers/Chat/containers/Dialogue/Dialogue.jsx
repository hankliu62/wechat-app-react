import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectAdvanced } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';
import * as Constants from '../../../../constants/Constants';
import * as chatActions from '../../../../actions/chat';
import ObjectUtils from '../../../../../../utils/ObjectUtils';

import './Dialogue.less';

class Dialogue extends Component {
  static propTypes = {
    currentChat: PropTypes.object,
    fetchChat: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      inputType: 'txt'
    };
  }

  componentDidMount() {
    const { match } = this.props;
    this.props.fetchChat(match.params.mid);
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
        return currentChat.base.nickname || currentChat.base.name;
      case Constants.CHAT_ROOM_TYPE_SERVICE:
        return currentChat.base.name;
    }

    return '';
  }

  render() {
    const { currentChat, match } = this.props;
    const { inputType } = this.state;

    if (!currentChat || currentChat.mid !== match.params.mid) {
      return null;
    }

    return (
      <div className="chat-dialogue-wrapper">
        <WeuiHeader title={this.getTitle(currentChat)} back={(<WeuiBack history={this.props.history}><span className="weui-back-centent">微信</span></WeuiBack>)} />

        <div className="dialogue-content">
          <div className="dialogue-content-body">Dialogue body</div>
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
  return (nextState, nextOwnProps) => {
    const chatMain = nextState.wechat.chatMain || {};
    const { currentChat } = chatMain;

    const nextResult = {
      ...nextOwnProps,
      currentChat,
      ...chatDispatchActions
    };
    result = ObjectUtils.shallowEqual(result, nextResult) ? result : nextResult;
    return result;
  };
};

export default connectAdvanced(selectorFactory)(Dialogue);
