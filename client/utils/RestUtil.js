import systemConfig from 'systemConfig';
import isEmpty from 'lodash/isEmpty';

class RestUtil {
  constructor(options) {
    this.options = options;
  }

  convertParamsToSearch = (params = {}) => {
    if (isEmpty(params)) {
      return '';
    }


    const current = new Date();
    params.timestamp = current.valueOf();
    params.tmoffset = current.getTimezoneOffset() / 60;

    let search = '?';
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const value = encodeURIComponent(params[key]);
        search = `${search + key}=${value}&`;
      }
    }

    return search.slice(0, -1);
  }

  getRestHost = () => {
    return this.options.restfulapi || systemConfig.restfulapi || 'http://hankliuwechat-server.leanapp.cn/v1/api';
  }

  Get = (path, params = {}) => {
    const search = this.convertParamsToSearch(params);
    return this.action('GET', path + search);
  }

  Post = (path, params = {}, data = {}) => {
    const search = this.convertParamsToSearch(params);
    return this.action('POST', path + search, data);
  }

  action = (method, pathSearch, data) => {
    const host = this.getRestHost();
    const url = host + pathSearch;

    const initOptions = { method };
    if (method !== 'GET' && data) {
      initOptions.headers = {
        'Content-Type': 'application/json'
      };
      initOptions.body = JSON.stringify(data);
    }

    return fetch(url, { method }).then((response) => {
      return Promise.resolve(response.json());
    }).catch((ex) => {
      alert(`fetch failed, url: ${url}; method: ${method}`);
      console.log('parsing failed', ex);
    });
  }
}

let instance;
const getInstance = () => {
  if (!instance) {
    instance = new RestUtil({ restfulapi: systemConfig.restfulapi });
  }

  return instance;
};

export const RestUtilInstance = getInstance();

export default RestUtil;

