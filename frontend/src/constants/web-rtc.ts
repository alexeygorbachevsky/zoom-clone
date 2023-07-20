export const CHANNEL = "presence-zoom-clone";

export const enum ACTIONS {
  createRoom = "create-room",
  joinRoom = "join-room",
}

export const enum EVENTS {
  userJoined = "client-user-joined",
  userRemoved = "client-socket-removed",
  iceCandidateShared = "client-ice-candidate-shared",
  sessionDescriptionShared = "client-session-description-shared",
}
