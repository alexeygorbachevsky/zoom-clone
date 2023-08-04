import { makeAutoObservable } from "mobx";

import type { RootStoreType } from "../../rootStore";

import {
  setPusher,
  setUserId,
  setIsRoomJoining,
  setIsLoadingPusher,
  setPusherError,
  setIsVideo,
  setIsAudio,
} from "./actions";
import { MainState } from "./types";

class MainStore {
  rootStore: RootStoreType;

  // State
  pusher: MainState["pusher"] = null;
  pusherError: MainState["pusherError"] = null;
  userId: MainState["userId"] = null;
  isLoadingPusher: MainState["isLoadingPusher"] = true;
  isRoomJoining: MainState["isRoomJoining"] = false;
  isVideo: MainState["isVideo"] = true;
  isAudio: MainState["isAudio"] = true;

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
  setIsVideo = setIsVideo;
  setIsAudio = setIsAudio;
}

export default MainStore;
