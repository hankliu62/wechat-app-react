

import * as ActionTypes from '../constants/ActionTypes';

export const fetchFriend = (wxid) => {
  return (dispatch, getState) => {
    const { contactMain = {} } = getState();
    const { contacts = [] } = contactMain;
    const friend = contacts.find(item => item.wxid === wxid);
    dispatch({ type: ActionTypes.WECHAT_ALBUM_GET_FRIEND, payload: { friend } });
  };
};
