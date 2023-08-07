import { makeAutoObservable } from "mobx";

import type { RootStoreType } from "../../rootStore";

import {
  setPusher,
  setUserId,
  setIsRoomJoining,
  setIsLoadingPusher,
  setPusherError,
} from "./actions";
import { MainState } from "./types";

class MainStore {
  rootStore: RootStoreType;

  // State
  pusher: MainState["pusher"] = null;
  pusherError: MainState["pusherError"] = null;
  userId: MainState["userId"] = null;
  roomId: MainState["roomId"] = null;
  isLoadingPusher: MainState["isLoadingPusher"] = true;
  isRoomJoining: MainState["isRoomJoining"] = false;

  constructor(rootStore: RootStoreType) {
    this.rootStore = rootStore;
    makeAutoObservable(this, { rootStore: false });
  }

  // Actions
  setPusher = setPusher;
  setUserId = setUserId;
  setIsRoomJoining = setIsRoomJoining;
  setIsLoadingPusher = setIsLoadingPusher;
  setPusherError = setPusherError;
}

export default MainStore;
