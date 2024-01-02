import InlineToolbarItem from "../InlineToolbarItem.ts";
import {a, className, href, name, onClick, style, target, text} from "../../../views.ts"

export default class LinkOpen extends InlineToolbarItem {
  public constructor() {
    const element = document.createElement("a")
    super(element)

    this.setupPatch()

    this.assignUnits(
      name("link_open"),
      className("link-open"),
      text("Open"),
      style({
        cursor: "pointer"
      }),
      target("_blank"),
      onClick(this.onClick.bind(this))
    )

    this.element.addEventListener("click", this.onClick.bind(this))
  }

  protected setupPatch() {
    const link = a(
      href("patch"),
      target("_blank"),
      className("link-patch"),
      style({
        visibility: "hidden"
      })
    )
    const node = link.render() as Node
    document.body.append(node)
  }

  protected onClick() {
    const link = this.element as HTMLLinkElement
    const a = document.querySelector(".link-patch") as HTMLLinkElement

    if (!a) return
    a.href = link.href
    a?.click()
  }
}