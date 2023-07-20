import type MainStore from "../mainStore";

import localStorageUtil from "operations/localStorage";

import { MainState } from "../types";

function setUserId(this: MainStore, payload: MainState["userId"]) {
  localStorageUtil.set<MainState["userId"]>(localStorageUtil.keys.userId, payload)
  this.userId = payload;
}

export default setUserId;
