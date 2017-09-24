import sortBy from 'lodash/sortBy';

import { WECHAT_CHAT_MAIN_SET, WECHAT_CHAT_FETCH_CHATS } from '../constants/ActionTypes';
import * as Constants from '../constants/Constants';
import { getAllContacters, getAllGroups, getAllOfficialAccounts } from './contact';

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
  const contacts = getAllContacters();
  const groups = getAllGroups();
  const officialAccounts = getAllOfficialAccounts();
  for (const chat of chats) {
    let baseResources = [];
    let chatMemberResources = [];
    switch (chat.base.type) {
      case Constants.CHAT_ROOM_TYPE_FRIENDS: {
        baseResources = contacts;
        chatMemberResources = contacts;
        break;
      }
      case Constants.CHAT_ROOM_TYPE_GROUP: {
        baseResources = groups;
        chatMemberResources = contacts;
        break;
      }
      case Constants.CHAT_ROOM_TYPE_SERVICE: {
        baseResources = officialAccounts;
        chatMemberResources = officialAccounts;
        break;
      }
    }

    const base = baseResources.find(item => item.wxid === chat.base.wxid) || {};
    chat.base = { ...base, ...chat.base };

    if (chat.base.type === Constants.CHAT_ROOM_TYPE_FRIENDS) {
      chat.base.name = chat.base.remark || chat.base.nickname;
    }

    const chatMembers = (chat.chatMemberModel || []).map((wxid) => {
      const member = chatMemberResources.find(item => item.wxid === wxid) || {};
      return { wxid, ...member };
    });
    chat.chatMemberModel = chatMembers;
  }
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
  }), 'lastTime');
  chatRooms.reverse();

  return {
    type: WECHAT_CHAT_FETCH_CHATS,
    payload: {
      chats,
      chatRooms
    }
  };
};
