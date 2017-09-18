import moment from 'moment';
import 'moment/locale/zh-cn';
import * as TimesConstants from '../constants/Times';

class WechatTimeUtil {
  static convertToRelativeTime(timestamp) {
    const time = moment(timestamp);
    if (time.isSame(moment(), 'day')) {
      return time.format(TimesConstants.DateHHmm);
    }

    if (moment().diff(time, 'days') <= 1) {
      return '昨天';
    }

    if (moment().diff(time, 'days') <= 7) {
      return time.format(TimesConstants.Datedddd);
    }

    return time.format(TimesConstants.DateYYMDWithSeparator.replace(/%s/g, '/'));
  }
}

export default WechatTimeUtil;
