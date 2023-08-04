import { makeAutoObservable } from "mobx";

import type { RootStoreType } from "../../rootStore";

import { clearState } from "./actions";
import { WebRTCState } from "./types";

class WebRTCStore {
  rootStore: RootStoreType;

  // State
  clients: WebRTCState["clients"] = {};
  peerConnections: WebRTCState["peerConnections"] = {};
  peerMediaElements: WebRTCState["peerMediaElements"] = {};
  remoteMediaStreams: WebRTCState["remoteMediaStreams"] = {};
  localMediaStream: WebRTCState["localMediaStream"] = null;

  constructor(rootStore: RootStoreType) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false,
      localMediaStream: false,
      remoteMediaStreams: false,
      peerMediaElements: false,
      peerConnections: false,
    });
  }

  // Actions
  clearState = clearState;
}

export default WebRTCStore;
