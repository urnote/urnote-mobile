import { observable, toJS } from 'mobx';
import merge from 'lodash/merge';
import WebDAV from '../support/WebDAV';

const WebDAV_URL ='https://dav.jianguoyun.com/';

export default class UrNoteStore {
  @observable.shallow docs = {};

  constructor() {
    this.WebDAV = new WebDAV(WebDAV_URL);
  }

  async configWebDAV(data) {
    const { username, password } = data;

    this.WebDAV.auth(username, password);

    return this.WebDAV.PROPFIND().then((data) => {
      this.docs = merge(toJS(this.docs), data.reduce((result, doc) => {
        result[doc['d:href']] = doc;
        return result;
      }, {}));
    });
  }
}
