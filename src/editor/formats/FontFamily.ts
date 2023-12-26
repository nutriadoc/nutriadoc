import {Scope} from "parchment"
import Quill from "quill"
import Font from "../font";

const FontClass = Quill.import("formats/font")
const parchment = Quill.import("parchment")

const FontFamilyClass = FontClass
FontFamilyClass.whitelist = undefined
FontFamilyClass.add = function(...args: any[]) {
  let [node, value] = args
  if (value) {
    node.style.fontFamily = value
  } else {
    node.style.fontFamily = null
  }
  return true
}


class FontFamilyAttributor extends parchment.Attributor {

  protected font: Font = Font.shared

  add(node: HTMLElement, value: string) {

    let family = this.font.item(value)?.family
    if (!family)
      family = value

    node.setAttribute(this.getKey(), value)
    node.style.fontFamily = family
    return true
  }

  value(node: HTMLElement) {
    return node.getAttribute(this.getKey());
  }

  protected getKey(): string {
    return `data-${this.keyName}`
  }
}

// @ts-ignore
const FontFamily = new FontFamilyAttributor("font", "font", {
  scope: Scope.INLINE,
})

export { FontFamily, FontFamilyClass }