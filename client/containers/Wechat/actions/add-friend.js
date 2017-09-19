import { WECHAT_ADD_FRIEND_SEARCH_FRIEND, WECHAT_ADD_FRIEND_MAIN_SET } from '../constants/ActionTypes';

export const setState = payload => ({ type: WECHAT_ADD_FRIEND_MAIN_SET, payload });

export const searchAddFriend = (pushState, wxid) => {
  return (dispatch, getState) => {
    const { wechat } = getState();
    const { contactMain = {} } = wechat;
    const { contacts = [] } = contactMain;
    const searchedFriend = contacts.find(contacter => contacter.wxid === wxid);
    if (searchedFriend) {
      pushState(`/wechat/contact/detail/${wxid}`);
    }

    dispatch({ type: WECHAT_ADD_FRIEND_SEARCH_FRIEND, payload: { searchedFriend, searching: false } });
  };
};
