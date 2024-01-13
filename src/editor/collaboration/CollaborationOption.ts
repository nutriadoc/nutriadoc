
export function getCollaborationOption(nutriaApiHost: string, option?: CollaborationOption): CollaborationOption {
  if (undefined == option) return { ws: `wss://${nutriaApiHost}/ws` }
  return option
}

export interface CollaborationOption  {
  ws: string
}