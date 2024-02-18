import { IView } from "@nutriadoc/classes"
import { CollaborationOption } from "./collaboration/CollaborationOption.ts"
import { TextChangeHandler } from "@/editor/events/TextChangeHandler.ts";

// export const NutriaApiHost: string = "i.nutria-doc.com"
export const NutriaApiHost: string = "127.0.0.1:5001"

export default interface Option {

  container?: IView

  collaboration?: CollaborationOption

  containerHTML?: string

  html?: string

  autoCreateDocument?: boolean

  documentId?: string

  authorization?: string

  key?: string

  height?: number | string

  workspace?: string

  assetFromRemote?: boolean

  delta?: any

  excludeCss?: string[]

  textChange?: TextChangeHandler
}