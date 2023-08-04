export const CHANNEL = "presence-zoom-clone";

export const enum Actions {
  createRoom = "create-room",
  joinRoom = "join-room",
}

export const enum Events {
  userJoined = "client-user-joined",
  userRemoved = "client-socket-removed",
  iceCandidateShared = "client-ice-candidate-shared",
  sessionDescriptionShared = "client-session-description-shared",
}
