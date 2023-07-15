import Pusher from "pusher-js";

export interface MainState {
  pusher: Pusher | null;
}
