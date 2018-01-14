import axios from 'axios';
import RNFB from 'react-native-fetch-blob';
import { parseString } from 'react-native-xml2js';
import get from 'lodash/get';
import forEach from 'lodash/forEach';
import fs from '../fs';

export default class WebDAV {
  constructor(baseURL) {
    this.instance = axios.create({
      baseURL,
      responseType: 'text',
    });

    forEach(WebDAV.METHODS, (handler, method) => {
      this[method] = (url, data) => this.instance.request({
        url,
        method,
        data,
        withCredentials: true,
      }).then(({ data }) => new Promise((resolve, reject) => {
        parseString(data, {
          explicitRoot: false,
          explicitArray: false,
        }, (err, result) => err ? reject(err) : resolve(handler(result)));
      }));
    });
  }

  auth(username, password) {
    const data = RNFB.base64.encode(username + ':' + password);
    const common = this.instance.defaults.headers.common;

    common['Authorization'] = 'Basic ' + data;

    return this;
  }
}

WebDAV.METHODS = {
  'DELETE': (result) => {},
  'GET': (result) => {},
  'LOCK': (result) => {},
  'UNLOCK': (result) => {},
  'MKCOL': (result) => {},
  'MOVE': (result) => {},
  'OPTIONS': (result) => {},
  'PROPFIND': (result) => {
    result = get(result, 'd:response', []);
    result.forEach((item, key) => {
      const name = get(item, ['d:propstat', 'd:prop', 'd:displayname']);
      const type = get(item, ['d:propstat', 'd:prop', 'd:getcontenttype']);

      if (key) {
        switch (type) {
          case 'httpd/unix-directory':
            fs.mkdir(name);
            break;
        }
      }
    });

    return result;
  },
  'PUT': (result) => {},
  'COPY': (result) => {},
};
