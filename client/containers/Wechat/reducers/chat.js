import * as ActionTypes from '../constants/ActionTypes';

const defaultState = {};

export default (state = { ...defaultState }, action) => {
  switch (action.type) {
    case ActionTypes.WECHAT_CHAT_FETCH_CHAT:
    case ActionTypes.WECHAT_CHAT_FETCH_CHATS:
    case ActionTypes.WECHAT_CHAT_MAIN_SET:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
