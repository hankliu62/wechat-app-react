import { WECHAT_SELF_MAIN_SET } from '../constants/ActionTypes';
import * as CONSTANTS from '../constants/Constants';

const defaultState = require('../constants/data-self.json');

defaultState.gender = defaultState.sex === 1 ? CONSTANTS.MALE : CONSTANTS.FEMALE;

export default (state = { ...defaultState }, action) => {
  switch (action.type) {
    case WECHAT_SELF_MAIN_SET:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
