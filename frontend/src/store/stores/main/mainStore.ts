import { makeAutoObservable } from "mobx";

import type { RootStoreType } from "../../rootStore";

import { setPusher, setUserId } from "./actions";
import { MainState } from "./types";

class MainStore {
  rootStore: RootStoreType;

  // State
  pusher: MainState["pusher"] = null;
  pusherError: MainState["pusherError"] = null;
  userId: MainState["userId"] = null;

  constructor(rootStore: RootStoreType) {
    this.rootStore = rootStore;
    makeAutoObservable(this, { rootStore: false });
  }

  // Actions
  setPusher = setPusher;
  setUserId = setUserId;
}

export default MainStore;
