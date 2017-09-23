import pinyin from 'pinyin';
import groupBy from 'lodash/groupBy';

import * as ActionTypes from '../constants/ActionTypes';
import * as CONSTANTS from '../constants/Constants';

export const setState = payload => ({ type: ActionTypes.WECHAT_CONTACT_MAIN_SET, payload });

export const getContacter = (wxid) => {
  let contacter;
  if (wxid) {
    const contacts = require('../constants/data-contact.json') || [];
    contacter = contacts.find(item => item.wxid === wxid);
  } else {
    contacter = require('../constants/data-self.json');
  }

  if (contacter) {
    contacter.gender = contacter.sex === 1 ? CONSTANTS.MALE : CONSTANTS.FEMALE;
  }
  return { type: ActionTypes.WECHAT_CONTACT_GET_CONTACTER, payload: { selectedContacter: contacter } };
};

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

export const fetchContacts = () => {
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
  const contacts = require('../constants/data-contact.json') || [];
  const { groups: contactGroups, letters: contactLetters } = getPinyinGroupsAndLettersStates(['remark', 'nickname'])(contacts);

  return {
    type: ActionTypes.WECHAT_CONTACT_FETCH_CONTACTS,
    payload: {
      contacts,
      contactGroups,
      contactLetters
    }
  };
};


export const fetchOfficialAccounts = () => {
  const officialAccounts = require('../constants/data-official-accounts.json') || [];
  const { groups: officialAccountsGroups, letters: officialAccountsLetters } = getPinyinGroupsAndLettersStates(['name'])(officialAccounts);

  return {
    type: ActionTypes.WECHAT_CONTACT_FETCH_OFFICIAL_ACCOUNTS,
    payload: {
      officialAccounts,
      officialAccountsGroups: officialAccountsGroups || {},
      officialAccountsLetters: officialAccountsLetters || []
    }
  };
};

