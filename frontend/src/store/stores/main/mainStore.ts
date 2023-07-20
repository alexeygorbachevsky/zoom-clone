import { makeAutoObservable } from "mobx";

import type { RootStoreType } from "../../rootStore";

import { setPusher, setUserId } from "./actions";
import { MainState } from "./types";
import localStorageUtil from "../../../operations/localStorage";

class MainStore {
  rootStore: RootStoreType;

  // State
  pusher: MainState["pusher"] = null;
  pusherError: MainState["pusherError"] = null;
  userId: MainState["userId"] = localStorageUtil.get(
    localStorageUtil.keys.userId,
  );

  constructor(rootStore: RootStoreType) {
    this.rootStore = rootStore;
    makeAutoObservable(this, { rootStore: false });
  }

  // Actions
  setPusher = setPusher;
  setUserId = setUserId;
}

export default MainStore;
