import View from "../../View.ts";
import {className, div} from "../../views.ts";
// import FontSizeIncrease from "../item/FontSizeIncrease.ts";
import IView from "../../IView.ts";

export default class InlineToolbar extends View implements IView {
  class = 'inline-toolbar'

  style = {
    display: 'flex',
  } as CSSStyleDeclaration

  _children = [
    div(
      className("inline-toolbar__item"),
      // div(style()),
      // FontSizeIncrease.new(event("click", this.onToolbarItemClick.bind(this)))
    ),
  ]

  onToolbarItemClick() {
    this.style.flex = "1"
  }
}