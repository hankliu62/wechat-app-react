import * as ActionTypes from '../constants/ActionTypes';
import * as CONSTANTS from '../constants/Constants';

export const setState = payload => ({ type: ActionTypes.WECHAT_SELF_MAIN_SET, payload });

export const getPersonal = () => {
  const personal = require('../constants/data-self.json');
  personal.gender = personal.sex === 1 ? CONSTANTS.MALE : CONSTANTS.FEMALE;
  return personal;
};

export const fetchPersonal = () => {
  const personal = getPersonal();
  return { type: ActionTypes.WECHAT_SELF_FETCH_PERSONAL, payload: { personal } };
};

