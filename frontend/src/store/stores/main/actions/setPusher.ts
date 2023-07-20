import type MainStore from "../mainStore";
import { MainState } from "../types";

function setPusher(this: MainStore, payload: MainState["pusher"]) {
  this.pusher = payload;
}

export default setPusher;
