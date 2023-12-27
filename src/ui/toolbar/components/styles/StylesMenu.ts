import i18n from "../../../../i18n"
import FloatingPosition from "../../../floating/FloatingPosition.ts"
import DefaultMenuItem from "../../../menu/DefaultMenuItem.ts"
import StylesMenuItem from "./StylesMenuItem.ts"
import Menu from "../../../menu/Menu.ts"

export default class StylesMenu extends Menu {

  protected items: DefaultMenuItem[] = []

  public constructor(relativePosition: FloatingPosition) {
    super("styles", relativePosition, StylesMenu.items())
    this._element.classList.add("insert-menu")
  }

  public static items(): StylesMenuItem[] {

    const headlines = [1, 2, 3, 4, 5, 6].map((index) => ({
      key: "heading" + index,
      name: i18n.t("menu.styles.heading") + " " + index
    }))

    return [
      {
        key: "normalText",
        name: i18n.t("menu.styles.normalText")
      },
      {
        key: "title",
        name: i18n.t("menu.styles.title"),
      },
      {
        key: "subtitle",
        name: i18n.t("menu.styles.subtitle"),
      },
      ...headlines
    ].map(item => this.createItem(item))
  }

  public static createItem(item: any): StylesMenuItem {
    return new StylesMenuItem(item.key, item.name)
  }
}