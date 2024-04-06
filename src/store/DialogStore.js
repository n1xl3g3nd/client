import { makeAutoObservable } from "mobx";

export default class DialogsStore {
  constructor() {
    this._dialogs = [];
    this._page = 1;
    this._totalCount = 0;
    this._limit = 3;

    makeAutoObservable(this);
  }

  setDialogs(dialogs) {
    this._dialogs = dialogs;
  }

  setPage(page) {
    this._page = page;
  }

  setTotalCount(count) {
    this._totalCount = count;
  }

  get dialogs() {
    return this._dialogs;
  }

  get page() {
    return this._page;
  }

  get totalCount() {
    return this._totalCount;
  }

  get limit() {
    return this._limit;
  }
}