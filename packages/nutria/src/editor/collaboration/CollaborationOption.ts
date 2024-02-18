import {NutriaApiHost} from "@/editor/Option.ts"

export function getCollaborationOption(option?: CollaborationOption): CollaborationOption {
  if (undefined == option) return { ws: `wss://${NutriaApiHost}/ws` }
  return option
}

export interface CollaborationOption  {
  ws: string
}