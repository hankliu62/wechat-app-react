import createBrowserHistory from 'history/createBrowserHistory';
import createHashHistory from 'history/createHashHistory';

import DeviceUtils from '../utils/DeviceUtils';

let history;

const historyInstance = (() => {
  if (!history) {
    history = DeviceUtils.browser.ie && DeviceUtils.browser.ie <= 8 ? createHashHistory() : createBrowserHistory();
  }
  return history;
})();

export default historyInstance;
