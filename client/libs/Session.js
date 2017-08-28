import base64 from 'base-64';

class Session {
  static setItem(key, value) {
    let valueJSON = JSON.stringify(value);
    key = base64.encode(key);
    valueJSON = base64.encode(valueJSON);
    window.localStorage.setItem(key, valueJSON);
  }

  static getItem(key) {
    key = base64.encode(key);
    const valueJSON = window.localStorage.getItem(key);

    if (valueJSON) {
      return JSON.parse(valueJSON);
    }

    return null;
  }

  static removeItem(key) {
    key = base64.encode(key);

    if (window.localStorage.getItem(key)) {
      window.localStorage.removeItem(key);
    }
  }

  static updateItem(key, value) {
    Session.removeItem(key);
    Session.setItem(key, value);
  }
}

export default Session;
