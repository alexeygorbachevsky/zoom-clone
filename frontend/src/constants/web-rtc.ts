export const CHANNEL = "presence-zoom-clone";

export const ICE_CANDIDATE_EXCHANGE_EVENT = "client-ice-candidate-exchange";

export const ACTIONS = {
  CREATE_ROOM: "create-room",
  JOIN_ROOM: "join-room",
  LEAVE_ROOM: "leave-room",
  SHARE_ROOMS: "share-rooms",
  ADD_PEER: "add-peer",
  REMOVE_PEER: "remove-peer",
  RELAY_SDP: "relay-sdp",
  RELAY_ICE: "relay-ice",
  ICE_CANDIDATE: "ice-candidate",
  SESSION_DESCRIPTION: "session-description",
};

export const EVENTS = {
  ROOM_CREATED: "room-created",
  ROOM_JOINED: "room-joined",
};
