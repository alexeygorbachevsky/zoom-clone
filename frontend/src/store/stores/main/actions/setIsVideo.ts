import type MainStore from "../mainStore";

import { MainState } from "../types";

function setIsVideo(this: MainStore, payload: MainState["isVideo"]) {
  this.isVideo = payload;
}

export default setIsVideo;
