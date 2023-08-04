import type MainStore from "../mainStore";

import { MainState } from "../types";

function setIsLoadingPusher(this: MainStore, payload: MainState["isLoadingPusher"]) {
  this.isLoadingPusher = payload;
}

export default setIsLoadingPusher;
