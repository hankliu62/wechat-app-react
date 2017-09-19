import sortBy from 'lodash/sortBy';

import { WECHAT_CHAT_MAIN_SET, WECHAT_CHAT_FETCH_CHATS } from '../constants/ActionTypes';
import * as Constants from '../constants/Constants';

export const setState = payload => ({ type: WECHAT_CHAT_MAIN_SET, payload });

export const fetchChats = () => {
  // 'mid' // 消息的id 唯一标识，重要
  // "chatBaseModel" // 对话列表基本项
  // "chatDialogueBarModel" //对话框底部菜单
  // "chatConfigModel.isStick" // 置顶
  // "chatConfigModel.newsMute" // 消息免打扰
  // "chatConfigModel.starFriends" // 标星
  // "chatConfigModel.blacklist" // 黑名单

  const chats = require('../constants/data-chats.json') || [];
  const chatRooms = sortBy((chats || []).map((chat) => {
    const chatRoom = {
      link: `wechat/chat/dialogue/${chat.mid}`,
      title: chat.base.name,
      lastTime: chat.chatBaseModel.endTimeStr,
      lastMessage: chat.chatBaseModel.endChatTxt,
      unreadCount: chat.chatBaseModel.newsUnreadCount,
      type: chat.base.type,
      mute: chat.chatConfigModel.newsMute
    };

    switch (chat.base.type) {
      case Constants.CHAT_ROOM_TYPE_FRIENDS:
        chatRoom.headerImages = [chat.base.headerUrl];
        break;
      case Constants.CHAT_ROOM_TYPE_GROUP:
        chatRoom.headerImages = (chat.chatMemberModel || []).map(member => member.headerUrl);
        chatRoom.lastSpeaker = chat.chatBaseModel.endChatAuth;

        break;
      case Constants.CHAT_ROOM_TYPE_SERVICE:
        chatRoom.headerImages = [chat.base.headerUrl];
        break;
    }
    return chatRoom;
  }), '-lastTime');

  return {
    type: WECHAT_CHAT_FETCH_CHATS,
    payload: {
      chats,
      chatRooms
    }
  };
};
