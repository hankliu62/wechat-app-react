import * as ActionTypes from '../constants/ActionTypes';

const defaultState = {
  selectedContacter: null
};

const getContacter = (state, wxid) => {
  return (state.contacts || []).find(contacter => contacter.wxid === wxid);
};

export default (state = { ...defaultState }, action) => {
  switch (action.type) {
    case ActionTypes.WECHAT_CONTACT_FETCH_CONTACTS:
    case ActionTypes.WECHAT_CONTACT_FETCH_OFFICIAL_ACCOUNTS:
    case ActionTypes.WECHAT_CONTACT_MAIN_SET:
      return { ...state, ...action.payload };
    case ActionTypes.WECHAT_CONTACT_GET_CONTACTER:
      return { ...state, selectedContacter: getContacter(state, action.wxid) };
    default:
      return state;
  }
};
