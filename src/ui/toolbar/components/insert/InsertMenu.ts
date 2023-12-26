import Floating from "../../../floating/Floating.ts"
import i18n from "../../../../i18n"
import FloatingPosition from "../../../floating/FloatingPosition.ts"
import MenuItem from "../../../menu/MenuItem.ts";

import "./InsertMenu.scss"


export default class InsertMenu extends Floating {

  public constructor(relative: HTMLElement, relativePosition: FloatingPosition) {
    super(relative, relativePosition)
    this._element.classList.add("insert-menu")

    this.addElement(InsertMenu.items())
  }

  public static items(): MenuItem[] {
    return [
      {
        key: "image",
        icon: "image",
        name: i18n.t("menu.picture"),
        canExpand: false,
      },
      {
        key: "table",
        icon: "table",
        name: i18n.t("menu.table"),
        canExpand: true,
      }
    ].map(item => this.createItem(item))
  }

  public static createItem(item: any): MenuItem {
    return new MenuItem(item.key, item.name, item.canExpand, item.icon)
  }
}