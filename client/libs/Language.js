import { loadLang } from 'redux-pagan';

import store from '../store/configureStore';
import Session from './Session';
import LANGUAGE, { LANGUAGE_STORAGE_KEY } from '../constants/Language';

class Language {
  static getLanguage() {
    let language = Session.getItem(LANGUAGE_STORAGE_KEY);

    if (!language) {
      language = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
    }

    return language;
  }

  static isChinese() {
    const language = Language.getLanguage();
    return LANGUAGE.ZH_TYPES.includes(language);
  }

  static isEnglish() {
    const language = Language.getLanguage();
    return LANGUAGE.EN_TYPES.includes(language);
  }

  static isEqualLanguage(target, other) {
    if (target === other) {
      return true;
    }

    const EN_TYPES = LANGUAGE.EN_TYPES;
    const ZH_TYPES = LANGUAGE.ZH_TYPES;

    return (EN_TYPES.includes(target) && EN_TYPES.includes(other)) ||
      (ZH_TYPES.includes(target) && ZH_TYPES.includes(other));
  }

  static getLangData(locale) {
    const type = LANGUAGE.ZH_TYPES.includes(locale) ? LANGUAGE.ZH_CN : LANGUAGE.EN_US;
    try {
      // here we use promise-loader to load lang data by demand
      return { type, data: require(`promise-loader?global,[name].i18n!json-loader!../i18n/${type}.i18n.json`) };
    } catch (err) {
      return { type, data: require(`promise-loader?global,[name].i18n!json-loader!../i18n/${type}.i18n.json`) };
    }
  }

  static loadLanguage() {
    const language = Language.getLanguage();
    store.dispatch(loadLang(language, (locale) => {
      const langData = Language.getLangData(locale);

      // 如果引入了moment，还需要修改moment的locale
      // moment.locale(langData.type);

      return langData.data;
    }));
  }
}

export default Language;
