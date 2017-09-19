import { WECHAT_CHAT_MAIN_SET, WECHAT_CHAT_FETCH_CHATS } from '../constants/ActionTypes';

const defaultState = {};

export default (state = { ...defaultState }, action) => {
  switch (action.type) {
    case WECHAT_CHAT_FETCH_CHATS:
    case WECHAT_CHAT_MAIN_SET:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
