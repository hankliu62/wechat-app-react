import { WECHAT_CONTACT_MAIN_SET, WECHAT_CONTACT_GET_CONTACTER } from '../constants/ActionTypes';

export const setState = payload => ({ type: WECHAT_CONTACT_MAIN_SET, payload });

export const getContacter = wxid => ({ type: WECHAT_CONTACT_GET_CONTACTER, wxid });
