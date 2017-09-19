import { WECHAT_FETCH_MOMENTS, WECHAT_SELF_FETCH_PERSONAL } from '../constants/ActionTypes';
import { getPersonal } from './self';

const moments = require('../constants/data-moments.json') || [];

export const fetchMoments = (wxid) => {
  return function (dispatch, getState) {
    if (!wxid) {
      const { wechat } = getState();
      const { selfMain = {} } = wechat;
      let { personal = {} } = selfMain;
      if (!personal.wxid) {
        personal = getPersonal();
        dispatch({ type: WECHAT_SELF_FETCH_PERSONAL, payload: { personal } });
      }

      wxid = personal.wxid;
      const fetchedMoments = moments.find(item => item.wxid === wxid);
      dispatch({ type: WECHAT_FETCH_MOMENTS, payload: { wxid, moments: fetchedMoments } });
    }
  };
};
