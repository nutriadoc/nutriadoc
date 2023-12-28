import IView from "../../../IView.ts";

export default interface IToolbarItemIcon extends IView {

  get color(): string | undefined

  set color(value: string | undefined)
}