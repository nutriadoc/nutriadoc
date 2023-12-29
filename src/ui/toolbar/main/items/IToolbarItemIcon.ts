import IInteractiveView from "../../../IInteractiveView.ts";

export default interface IToolbarItemIcon extends IInteractiveView {

  get color(): string | undefined

  set color(value: string | undefined)
}