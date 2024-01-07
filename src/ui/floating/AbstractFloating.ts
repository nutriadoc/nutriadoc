import Position from "./Position.ts";
import IView from "../IView.ts";

export default class AbstractFloating {

  protected _relative?: HTMLElement

  protected _position?: Position

  protected _relativeTo: "viewport" | "element" = "viewport"

  protected _visible: boolean = true

  protected attachedEvent: boolean = false

  protected _zIndex: number = 100

  protected _container?: IView

  protected spacing: number

  protected documentClickHandler: any


}