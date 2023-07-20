import { makeAutoObservable } from "mobx";

import type { RootStoreType } from "../../rootStore";

import { setPusher } from "./actions";
import { WebRTCState } from "./types";

class WebRTCStore {
  rootStore: RootStoreType;

  // State
  clients: WebRTCState["clients"] = {};
  peerConnections: WebRTCState["peerConnections"] = {};
  peerMediaElements: WebRTCState["peerMediaElements"] = {};
  remoteStreams: WebRTCState["remoteStreams"] = {};
  localMediaStream: WebRTCState["localMediaStream"] = null;

  constructor(rootStore: RootStoreType) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false,
      localMediaStream: false,
      remoteStreams: false,
      peerMediaElements: false,
      peerConnections: false,
    });
  }

  // Actions
  setPusher = setPusher;
}

export default WebRTCStore;
