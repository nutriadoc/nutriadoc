import IView from "../ui/IView.ts"
import { CollaborationOption } from "./collaboration/CollaborationOption.ts"

export const NutriaApiHost: string = "i.nutria-doc.com"
export default interface Option {

  container?: IView

  collaboration?: CollaborationOption

  html?: string

  key?: string

  workspace?: string

  assetFromRemote?: boolean
}