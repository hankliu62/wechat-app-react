import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';

import * as ActionTypes from '../constants/ActionTypes';
import { RestUtilInstance } from '../../../utils/RestUtil';
import { getPersonal } from './self';

export const getAllContacters = async () => {
  const response = await RestUtilInstance.Get('/wechat/contacts');
  const contacts = response.data.items;

  return contacts;
};

export const getAllGroups = async () => {
  const response = await RestUtilInstance.Get('/wechat/groups');
  const groups = response.data.items;

  return groups;
};

export const getAllOfficialAccounts = async () => {
  const response = await RestUtilInstance.Get('/wechat/official-accounts');
  const officialAccounts = response.data.items;

  return officialAccounts;
};

export const setState = payload => ({ type: ActionTypes.WECHAT_CONTACT_MAIN_SET, payload });

export const getContacter = (wxid) => {
  return async (dispatch, getState) => {
    const { wechat: { contactMain, selfMain } } = getState();
    let contacter;
    if (wxid) {
      const contacts = contactMain.contacts || [];
      contacter = contacts.find(item => item.wxid === wxid);
    } else if (isEmpty(selfMain) || !selfMain.personal) {
      contacter = await getPersonal();
    } else {
      contacter = cloneDeep(selfMain.personal);
    }

    dispatch({ type: ActionTypes.WECHAT_CONTACT_GET_CONTACTER, payload: { selectedContacter: contacter } });
  };
};

const groupByKey = key => (items) => {
  const groups = groupBy(items, item => item[key]);
  const allLetters = Object.keys(groups) || [];
  const letters = allLetters.filter(item => item !== '#').sort();
  if (allLetters.includes('#')) {
    letters.push('#');
  }

  return { groups, letters };
};

export const fetchContacts = () => {
  return async (dispatch) => {
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
    const contacts = await getAllContacters();
    const { groups: contactGroups, letters: contactLetters } = groupByKey('initial')(contacts);

    dispatch({
      type: ActionTypes.WECHAT_CONTACT_FETCH_CONTACTS,
      payload: {
        contacts,
        contactGroups,
        contactLetters
      }
    });
  };
};


export const fetchOfficialAccounts = () => {
  return async (dispatch) => {
    const officialAccounts = await getAllOfficialAccounts();
    const { groups: officialAccountsGroups, letters: officialAccountsLetters } = groupByKey(['initial'])(officialAccounts);

    dispatch({
      type: ActionTypes.WECHAT_CONTACT_FETCH_OFFICIAL_ACCOUNTS,
      payload: {
        officialAccounts,
        officialAccountsGroups: officialAccountsGroups || {},
        officialAccountsLetters: officialAccountsLetters || []
      }
    });
  };
};

