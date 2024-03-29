import IToolbarItemIcon from "./IToolbarItemIcon.ts";
import ColorView from "./ColorView.ts";
import {className} from "@nutriadoc/classes";

export default class ToolbarItemSvgIcon extends ColorView implements IToolbarItemIcon {

  public constructor(svg: string, size: number = 16) {
    super()
    this.assignUnits(className("icon", "svg-icon"))

    this.element.innerHTML = svg

    this.element.style.width = `${size}px`
    this.element.style.height = `${size}px`

    const s = this.element.children[0] as HTMLElement
    s.style.marginTop = "-2px"
  }
}