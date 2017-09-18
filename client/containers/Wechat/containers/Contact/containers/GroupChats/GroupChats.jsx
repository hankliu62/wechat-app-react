import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectAdvanced } from 'react-redux';
import { bindActionCreators } from 'redux';
import debug from 'debug';

import ObjectUtils from '../../../../../../utils/ObjectUtils';
import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';
import WeuiSearchBar from '../../../../components/WeuiSearchBar/WeuiSearchBar';
import WeuiCells from '../../../../components/WeuiCells/WeuiCells';
import WeuiChatAvatar from '../../../../components/WeuiChatAvatar/WeuiChatAvatar';
import * as contactActions from '../../../../actions/contact';
import * as Constants from '../../../../constants/Constants';

import './GroupChats.less';

const wechatContactDebug = debug('wechat:contact');

class GroupChats extends Component {
  static propTypes = {
    groupChats: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    setState: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    wechatContactDebug('GroupChats page init props:', props);
    wechatContactDebug('GroupChats page props setState function', props.setState);
  }

  renderChatGroupsCells = () => {
    const { groupChats } = this.props;

    const groupChatCells = groupChats.map(groupChat => ({
      left: (<WeuiChatAvatar images={groupChat.headerImages} />),
      center: (<p>{groupChat.name}</p>),
      link: `/wechat/chat/dialogue/${groupChat.mid}`
    }));

    return (<WeuiCells cells={groupChatCells} />);
  }

  render() {
    const { total } = this.props;

    return (
      <div className="contact-group-chats-wrapper">
        <WeuiHeader title="群聊" back={(<WeuiBack history={this.props.history}><span className="weui-back-centent">通讯录</span></WeuiBack>)} />

        <WeuiSearchBar />

        { this.renderChatGroupsCells() }

        <p className="contact-statistics">{`${total}个群聊`}</p>
      </div>
    );
  }
}

const selectorFactory = (dispatch) => {
  let result = {};

  const contactDispatchActions = bindActionCreators(contactActions, dispatch);
  return (nextState, nextOwnProps) => {
    const { chats = [] } = nextState.wechat.chat;
    const groupChats = [];
    for (const chat of chats) {
      if (chat.base.type === Constants.CHAT_ROOM_TYPE_GROUP) {
        groupChats.push({
          mid: chat.mid,
          wxid: chat.base.wxid,
          name: chat.base.name,
          headerImages: (chat.chatMemberModel || []).map(member => member.headerUrl)
        });
      }
    }

    const total = groupChats.length;
    const nextResult = {
      ...nextOwnProps,
      groupChats,
      total,
      ...contactDispatchActions
    };
    result = ObjectUtils.shallowEqual(result, nextResult) ? result : nextResult;
    return result;
  };
};

export default connectAdvanced(selectorFactory)(GroupChats);
