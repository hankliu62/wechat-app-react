import { WECHAT_ADD_FRIEND_SEARCH_FRIEND, WECHAT_ADD_FRIEND_MAIN_SET } from '../constants/ActionTypes';

const defaultState = {
  searchKey: '',
  searchedFriend: null,
  searching: false,
  focusing: false
};

export default (state = { ...defaultState }, action) => {
  switch (action.type) {
    case WECHAT_ADD_FRIEND_MAIN_SET:
    case WECHAT_ADD_FRIEND_SEARCH_FRIEND:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
