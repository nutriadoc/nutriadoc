import IView from "../ui/IView.ts";

export interface CollaborationOption  {
  ws: string
}

export default interface Option {

  container?: IView

  view?: IView

  collaboration?: CollaborationOption

  html?: string

  name?: string

  assetFromRemote?: boolean
}