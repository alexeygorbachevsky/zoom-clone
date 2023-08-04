import type MainStore from "../mainStore";

import { MainState } from "../types";

function setIsAudio(this: MainStore, payload: MainState["isAudio"]) {
  this.isAudio = payload;
}

export default setIsAudio;
