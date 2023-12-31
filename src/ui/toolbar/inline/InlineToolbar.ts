import IView from "../../IView.ts";
import Floating from "../../floating/Floating.ts";
import Position from "../../floating/Position.ts";
import View from "../../View.ts";

export default class InlineToolbar extends Floating implements IView {
  class = 'inline-toolbar'

  style = {
    display: 'flex',
  } as CSSStyleDeclaration

  public constructor(element: HTMLElement, children: IView[]) {
    super(Position.TopLeft, children, "element", 5, element)
  }

  public visible(relative?: HTMLElement | View | undefined, container?: View) {
    super.visible(relative, container);

    this._element.style.cursor = "pointer"
  }
}