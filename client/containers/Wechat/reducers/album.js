import * as ActionTypes from '../constants/ActionTypes';

const defaultState = {};

export default (state = { ...defaultState }, action) => {
  switch (action.type) {
    case ActionTypes.WECHAT_ALBUM_GET_FRIEND:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
