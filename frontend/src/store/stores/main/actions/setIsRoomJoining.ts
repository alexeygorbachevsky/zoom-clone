import type MainStore from "../mainStore";

import { MainState } from "../types";

function setIsRoomJoining(this: MainStore, payload: MainState["isRoomJoining"]) {
  this.isRoomJoining = payload;
}

export default setIsRoomJoining;
