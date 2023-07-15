import Pusher from "pusher-js";

import type MainStore from "../mainStore";

// eslint-disable-line no-unused-vars
function setPusher(this: MainStore, payload: Pusher) {
  this.pusher = payload;
}

export default setPusher;
