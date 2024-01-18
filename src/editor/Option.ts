import IView from "../ui/IView.ts"
import { CollaborationOption } from "./collaboration/CollaborationOption.ts"

export const NutriaApiHost: string = "i.nutria-doc.com"
export default interface Option {

  container?: IView

  collaboration?: CollaborationOption

  containerHTML?: string

  html?: string

  key?: string

  height?: number | string

  workspace?: string

  assetFromRemote?: boolean

  delta?: any

  excludeCss?: string[]
}