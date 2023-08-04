import type MainStore from "../mainStore";

import { MainState } from "../types";

function setPusherError(this: MainStore, payload: MainState["pusherError"]) {
  this.pusherError = payload;
}

export default setPusherError;
