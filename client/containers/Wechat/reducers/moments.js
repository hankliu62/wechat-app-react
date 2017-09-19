import { WECHAT_FETCH_MOMENTS } from '../constants/ActionTypes';

const defaultState = {};

export default (state = { ...defaultState }, action) => {
  switch (action.type) {
    case WECHAT_FETCH_MOMENTS:
      return { ...state, [action.payload.wxid]: action.payload.moments };
    default:
      return state;
  }
};
