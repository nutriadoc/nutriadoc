import i18n from "../../../../i18n"
import FloatingPosition from "../../../floating/FloatingPosition.ts"
import DefaultMenuItem from "../../../menu/DefaultMenuItem.ts";
import Menu from "../../../menu/Menu.ts";

import "./InsertMenu.scss"

export default class InsertMenu extends Menu {

  public constructor(relativePosition: FloatingPosition) {
    super("insert", relativePosition, InsertMenu.items())
    this._element.classList.add("insert-menu")
  }

  public static items(): DefaultMenuItem[] {
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

  public static createItem(item: any): DefaultMenuItem {
    return new DefaultMenuItem(item.key, item.name, item.canExpand, item.icon)
  }
}