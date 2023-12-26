import i18n from "../../../../i18n";
import Floating from "../../../floating/Floating.ts";
import FloatingPosition from "../../../floating/FloatingPosition.ts";
import MenuItem from "../../../menu/MenuItem.ts";
import MenuItemEvent from "../../../menu/MenuItemEvent.ts";
import StylesMenuItem from "./StylesMenuItem.ts";

export default class StylesMenu extends Floating {

  protected items: MenuItem[] = []

  public constructor(relative: HTMLElement, relativePosition: FloatingPosition) {
    super(relative, relativePosition)
    this._element.classList.add("insert-menu")

    this.items = StylesMenu.items()
    this.setupItemsListener()
    this.addElement(this.items)
  }

  protected setupItemsListener() {
    this.items.forEach(item => {
      item.addEventListener("select", this.onMenuItemSelect.bind(this))
    })
  }

  protected onMenuItemSelect(event: Event) {
    const e = event as MenuItemEvent
    this.dispatchEvent(new MenuItemEvent(e.type, e.item))

    this.hidden()
  }

  public static items(): StylesMenuItem[] {

    const headlines = [1, 2, 3, 4, 5, 6].map((index) => ({
      key: "heading" + index,
      name: i18n.t("menu.styles.heading") + " " + index
    }))

    return [
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