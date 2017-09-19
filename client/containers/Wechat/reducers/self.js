import * as ActionTypes from '../constants/ActionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.WECHAT_SELF_FETCH_PERSONAL:
    case ActionTypes.WECHAT_SELF_MAIN_SET:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
