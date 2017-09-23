import * as ActionTypes from '../constants/ActionTypes';

const defaultState = {
  selectedContacter: null
};

export default (state = { ...defaultState }, action) => {
  switch (action.type) {
    case ActionTypes.WECHAT_CONTACT_FETCH_CONTACTS:
    case ActionTypes.WECHAT_CONTACT_FETCH_OFFICIAL_ACCOUNTS:
    case ActionTypes.WECHAT_CONTACT_MAIN_SET:
    case ActionTypes.WECHAT_CONTACT_GET_CONTACTER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
