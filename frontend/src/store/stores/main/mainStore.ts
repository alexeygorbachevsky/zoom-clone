import { makeAutoObservable } from "mobx";

import type { RootStoreType } from "../../rootStore";

import { setPusher } from "./actions";
import { MainState } from "./types";

class MainStore {
  rootStore: RootStoreType;

  // State
  pusher: MainState["pusher"] = null;

  constructor(rootStore: RootStoreType) {
    this.rootStore = rootStore;
    makeAutoObservable(this, { rootStore: false });
  }

  // Actions
  setPusher = setPusher;
}

export default MainStore;
