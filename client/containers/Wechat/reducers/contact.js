import pinyin from 'pinyin';
import groupBy from 'lodash/groupBy';

import { WECHAT_CONTACT_MAIN_SET, WECHAT_CONTACT_GET_CONTACTER } from '../constants/ActionTypes';
import * as CONSTANTS from '../constants/Constants';

/**
 * wxid-微信id
 * initial-姓名首字母
 * headerUrl-头像地址
 * nickname-昵称
 * sex-性别 男1女0
 * remark-备注
 * signature-个性签名
 * telphone-电话号码
 * album-相册
 * area-地区
 * from-来源
 * desc-描述
 */
const contacts = require('../constants/data-contact.json');
const officialAccounts = require('../constants/data-official-accounts.json');

const pickObjectValue = (item, keys) => {
  for (const key of keys) {
    if (item[key]) {
      return item[key];
    }
  }

  return '';
};

const getPinyinGroupsAndLettersStates = keys => (items) => {
  const pinyinOptions = {
    heteronym: false,
    style: pinyin.STYLE_NORMAL // 设置拼音风格
  };

  let hasUnknowItem = false;
  for (const item of items) {
    item.gender = item.sex === 1 ? CONSTANTS.MALE : CONSTANTS.FEMALE;
    item.initial = '';
    const pinyins = pinyin(pickObjectValue(item, keys), pinyinOptions);
    if (pinyins && pinyins.length) {
      if (pinyins[0] && pinyins[0].length && pinyins[0][0]) {
        if (/\w/.test(pinyins[0][0][0])) {
          item.initial = pinyins[0][0][0].toUpperCase();
        } else {
          item.initial = '#';
          hasUnknowItem = true;
        }
      }
      item.pinyin = ([]).concat.call([], ...pinyins).join('');
    }
  }

  const groups = groupBy(items, item => item.initial);
  const allLetters = Object.keys(groups) || [];
  const letters = allLetters.filter(item => item !== '#').sort();
  if (hasUnknowItem) {
    letters.push('#');
  }

  return { groups, letters };
};

const { groups: contactGroups, letters: contactLetters } = getPinyinGroupsAndLettersStates(['remark', 'nickname'])(contacts);
const { groups: officialAccountsGroups, letters: officialAccountsLetters } = getPinyinGroupsAndLettersStates(['name'])(officialAccounts);

const defaultState = {
  contacts,
  contactGroups,
  contactLetters,
  officialAccounts,
  officialAccountsGroups,
  officialAccountsLetters,
  selectedContacter: null
};

const getContacter = (state, wxid) => {
  return (state.contacts || []).find(contacter => contacter.wxid === wxid);
};

export default (state = { ...defaultState }, action) => {
  switch (action.type) {
    case WECHAT_CONTACT_MAIN_SET:
      return { ...state, ...action.payload };
    case WECHAT_CONTACT_GET_CONTACTER:
      return { ...state, selectedContacter: getContacter(state, action.wxid) };
    default:
      return state;
  }
};
