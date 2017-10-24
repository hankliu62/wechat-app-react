import * as ActionTypes from '../constants/ActionTypes';

const defaultState = {
  messages: {}
};

export default (state = { ...defaultState }, action) => {
  switch (action.type) {
    case ActionTypes.WECHAT_CHAT_FETCH_CHAT:
    case ActionTypes.WECHAT_CHAT_FETCH_CHATS:
    case ActionTypes.WECHAT_CHAT_MAIN_SET:
      return { ...state, ...action.payload };
    case ActionTypes.WECHAT_CHAT_FETCH_MESSAGES:
      return { ...state, messages: { ...state.messages, [action.payload.chatId]: action.payload.messages } };
    default:
      return state;
  }
};
