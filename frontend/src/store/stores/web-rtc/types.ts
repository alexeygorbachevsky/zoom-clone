//  TODO
export interface WebRTCState {
  clients: Record<string, { id: string; isVideo: boolean; isAudio: boolean }>;
  // eslint-disable-next-line
  peerConnections: Record<string, any>;
  // eslint-disable-next-line
  peerMediaElements: Record<string, any>;
  remoteMediaStreams: Record<string, MediaStream | null>;
  localMediaStream: MediaStream | null;
}
