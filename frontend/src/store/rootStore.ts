import { createContext } from "react";
import { configure } from "mobx";

import { AlertsStore, MainStore } from "./stores";

class RootStore {
  main: MainStore;
  alerts: AlertsStore;

  constructor() {
    this.main = new MainStore(this);
    this.alerts = new AlertsStore(this);
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
