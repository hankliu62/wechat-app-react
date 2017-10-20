class UrlUtil {
  static transformUrlQuery(query) {
    let urlQuery = '';
    for (const key in (query || {})) {
      if (({}).hasOwnProperty.call(query, key)) {
        urlQuery = `${urlQuery}&${key}=${query[key]}`;
      }
    }

    return urlQuery.length ? urlQuery.slice(1) : urlQuery;
  }

  static getParam(key) {
    const reg = new RegExp(`(\\?|\\&)${key}=([^\\&]+)`);
    const result = window.location.search.match(reg);

    if (result && result[2]) {
      return result[2];
    }

    return '';
  }
}

export default UrlUtil;
