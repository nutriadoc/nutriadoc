import InlineToolbarItem from "../InlineToolbarItem.ts";
import {className, name, onClick, style, target, text} from "../../../views.ts"

export default class LinkOpenButton extends InlineToolbarItem {

  protected linkElement: HTMLLinkElement

  public constructor() {
    super()

    this.linkElement = document.createElement("a") as unknown as HTMLLinkElement
    this._element.append(this.linkElement)
    this.assignUnits(
      name("link_open"),
      className("link-open", "inline-toolbar-item"),
      text("Open link"),
      style({
        cursor: "pointer"
      }),
      target("_blank"),
      onClick(this.onClick.bind(this))
    )
  }


  public set link(value: string) {
    this.linkElement.href = value
  }

  protected onClick() {
    this.dispatchEvent(new MouseEvent("click"))
  }
}