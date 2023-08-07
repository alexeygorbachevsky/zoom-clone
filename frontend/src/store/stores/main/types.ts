import Pusher from "pusher-js";

export interface MainState {
  pusher: Pusher | null;
  pusherError: string | null;
  userId: string | null;
  isRoomJoining: boolean;
  isLoadingPusher: boolean;
  isAudio: boolean;
}
