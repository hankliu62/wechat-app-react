import pinyin from 'pinyin';
import groupBy from 'lodash/groupBy';

import { WECHAT_CONTACT_MAIN_SET } from '../constants/ActionTypes';

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
const contacts = require('../constants/contact.json');

const pinyinOptions = {
  heteronym: false,
  style: pinyin.STYLE_NORMAL // 设置拼音风格
};

for (const item of contacts) {
  item.initial = '';
  const pinyins = pinyin(item.remark || item.nickname, pinyinOptions);
  if (pinyins && pinyins.length) {
    if (pinyins[0] && pinyins[0].length && pinyins[0][0]) {
      item.initial = pinyins[0][0][0];
    }
    item.pinyin = ([]).concat.call([], ...pinyins).join('');
  }
}

const contactGroups = groupBy(contacts, item => item.initial);
const letters = Object.keys(contactGroups) || [];

const defaultState = {
  contacts,
  contactGroups,
  contactLetters: letters.sort()
};

export default (state = { ...defaultState }, action) => {
  switch (action.type) {
    case WECHAT_CONTACT_MAIN_SET:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
