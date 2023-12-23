import ContextualMenu from "../ContextualMenu"
import InsertMenuItem from "./InsertMenuItem"
import i18n from "../../i18n"
import ContextualMenuPosition from "../ContextualMenuPosition"

import "./InsertMenu.scss"

export default class InsertMenu extends ContextualMenu {

  public constructor(relative: HTMLElement, relativePosition: ContextualMenuPosition) {
    super(relative, relativePosition)
    this._element.classList.add("insert-menu")

    this.addElement(InsertMenu.items())
  }

  public static items(): InsertMenuItem[] {
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

  public static createItem(item: any): InsertMenuItem {
    return new InsertMenuItem(item.key, item.name, item.canExpand, item.icon)
  }
}