import { IInteractiveView } from "@nutriadoc/classes"

export default interface IToolbarItemIcon extends IInteractiveView {

  get color(): string | undefined

  set color(value: string | undefined)
}