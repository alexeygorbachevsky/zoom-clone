import { createContext } from "react";
import { configure } from "mobx";

import { AlertsStore, MainStore, WebRTCStore  } from "./stores";

class RootStore {
  main: MainStore;
  alerts: AlertsStore;
  webRTC: WebRTCStore;

  constructor() {
    this.alerts = new AlertsStore(this);
    this.main = new MainStore(this);
    this.webRTC = new WebRTCStore(this);
  }

  static configure() {
    if (process.env.NODE_ENV !== "production") {
      configure({
        enforceActions: "always",
        computedRequiresReaction: true,
        reactionRequiresObservable: true,
        // observableRequiresReaction: true,
        disableErrorBoundaries: true,
      });
    }
  }
}

RootStore.configure();

const rootStore = new RootStore();

export type RootStoreType = RootStore;

export const RootStoreContext = createContext(rootStore);

export default rootStore;
