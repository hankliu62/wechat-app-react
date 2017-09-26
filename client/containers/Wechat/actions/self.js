import * as ActionTypes from '../constants/ActionTypes';

import { RestUtilInstance } from '../../../utils/RestUtil';

export const getPersonal = async () => {
  const response = await RestUtilInstance.Get('/wechat/self');
  const personal = response.data.item;
  return personal;
};

export const setState = payload => ({ type: ActionTypes.WECHAT_SELF_MAIN_SET, payload });

export const fetchPersonal = () => {
  return async (dispatch) => {
    const personal = await getPersonal();
    dispatch({ type: ActionTypes.WECHAT_SELF_FETCH_PERSONAL, payload: { personal } });
  };
};

