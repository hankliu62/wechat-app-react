import moment from 'moment';
import groupBy from 'lodash/groupBy';

import { WECHAT_CONTACT_FETCH_NEW_FRIENDS } from '../constants/ActionTypes';

const keys = ['今天', '昨天', '前天', '三天前'];

const getFriendsGroupKey = (timestamp) => {
  const diffDay = moment().diff(moment(timestamp), 'days');
  return keys[diffDay] ? keys[diffDay] : keys[keys.length - 1];
};

export const fetchNewFriends = () => {
  const newFriends = require('../constants/data-new-friends.json') || [];
  const newFriendsGroups = groupBy(newFriends, friend => getFriendsGroupKey(friend.time)) || {};
  const newFriendsGroupsKeys = Object.keys(newFriendsGroups).sort((pre, next) => keys.indexOf(pre) - keys.indexOf(next));

  return {
    type: WECHAT_CONTACT_FETCH_NEW_FRIENDS,
    payload: {
      newFriends,
      newFriendsGroups,
      newFriendsGroupsKeys
    }
  };
};
