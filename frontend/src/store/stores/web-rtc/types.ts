//  TODO
export interface WebRTCState {
  clients: Record<string, string>;
  peerConnections: Record<string, never>;
  peerMediaElements: Record<string, never>;
  remoteMediaStreams: Record<string, MediaStream | null>;
  localMediaStream: MediaStream | null;
}
