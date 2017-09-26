import groupBy from 'lodash/groupBy';
import moment from 'moment';
import { WECHAT_ALBUM_FETCH_MOMENTS, WECHAT_SELF_FETCH_PERSONAL } from '../constants/ActionTypes';
import { DateYYYYMMDD, DateM, DateD } from '../constants/Times';
import { getPersonal } from './self';
import { RestUtilInstance } from '../../../utils/RestUtil';

export const getMoments = async () => {
  const response = await RestUtilInstance.Get('/wechat/moments');
  const moments = response.data.items;

  return moments;
};

export const fetchMoments = (wxid) => {
  return async (dispatch, getState) => {
    if (!wxid) {
      const { wechat } = getState();
      const { selfMain = {} } = wechat;
      let { personal = {} } = selfMain;
      if (!personal.wxid) {
        personal = await getPersonal();
        dispatch({ type: WECHAT_SELF_FETCH_PERSONAL, payload: { personal } });
      }
      wxid = personal.wxid;
    }

    const totalMoments = await getMoments();
    const fetchContactMoments = totalMoments.find(item => item.wxid === wxid) || [];
    const moments = fetchContactMoments.moments;
    const momentsGroups = groupBy(moments, item => new Date(item.date).getFullYear()) || {};
    for (const key in momentsGroups) {
      if (Object.prototype.hasOwnProperty.call(momentsGroups, key)) {
        const innerGroupMoments = momentsGroups[key].map((item) => {
          const date = moment(item.date);
          return {
            ...item,
            letter: date.format(DateYYYYMMDD),
            day: date.format(DateD),
            month: date.format(DateM)
          };
        });
        const innerMomentsGroups = groupBy(innerGroupMoments, 'letter');

        momentsGroups[key] = innerMomentsGroups;
      }
    }
    fetchContactMoments.momentsGroups = momentsGroups;
    // const momentsLetters = Object.keys(momentsGroups).sort((pre, next) => pre - next);
    // fetchContactMoments.momentsLetters = momentsLetters;

    dispatch({ type: WECHAT_ALBUM_FETCH_MOMENTS, payload: { wxid, moments: fetchContactMoments } });
  };
};
