import { WECHAT_CONTACT_FETCH_NEW_FRIENDS } from '../constants/ActionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case WECHAT_CONTACT_FETCH_NEW_FRIENDS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
