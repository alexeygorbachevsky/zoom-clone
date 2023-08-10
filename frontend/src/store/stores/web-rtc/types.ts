export interface WebRTCState {
  clients: Record<string, { id: string; isVideo: boolean; isAudio: boolean }>;
  peerConnections: Record<string, RTCPeerConnection>;
  peerMediaElements: Record<string,  HTMLVideoElement>;
  remoteMediaStreams: Record<string, MediaStream | null>;
  localMediaStream: MediaStream | null;
  cameraVideoTrack: MediaStreamTrack | null;
}
