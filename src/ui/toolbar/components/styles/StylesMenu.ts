import i18n from "../../../../i18n"
import Position from "../../../floating/Position.ts"
import Menu from "../../../menu/Menu.ts"
import MenuItem from "../../../menu/MenuItem.ts";
import DefaultMenuItem from "../../../menu/DefaultMenuItem.ts";

export default class StylesMenu extends Menu {

  public constructor(relativePosition: Position) {
    super("header", relativePosition, StylesMenu.items())
    this._element.classList.add("insert-menu")
  }

  public static items(): MenuItem[] {

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

  public static createItem(item: any): MenuItem {
    return new DefaultMenuItem(item.key, item.name)
  }
}