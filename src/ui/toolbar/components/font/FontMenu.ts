import Floating from "../../../floating/Floating.ts";
import FloatingPosition from "../../../floating/FloatingPosition.ts";
import MenuItem from "../../../menu/MenuItem.ts";
import Fonts from "../../../../editor/font/DefaultFonts.ts";
import MenuItemEvent from "../../../menu/MenuItemEvent.ts";
import {FontMenuEvent} from "./FontMenuEvent.ts";

export default class FontMenu extends Floating {

  protected items: MenuItem[] = []

  protected family: Map<string, string> = new Map()

  public constructor(relative: HTMLElement, relativePosition: FloatingPosition) {
    super(relative, relativePosition)
    this._element.classList.add("insert-menu")

    Fonts.forEach(font => {
      this.family.set(font.name, font.family)
    })

    this.items = FontMenu.items()
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
    const family = this.family.get(e.item.key)
    this.dispatchEvent(new FontMenuEvent("select", { name: e.item.key, family }))

    this.hidden()
  }

  public active(key: string) {
    this.items.forEach(item => {
      if (item.key === key) {
        debugger
        item.active()
      } else {
        if (item.isActivated()) {
          item.deactive()
        }
      }
    })
  }

  static items(): MenuItem[] {
    return Fonts.map(font => (FontMenu.createItem(font)))
  }

  public static createItem(item: {name: string, family: string}): MenuItem {
    const menu = new MenuItem(item.name, item.name)
    menu.key = item.name
    const name = (menu.nameElement as HTMLElement)
    name.style.fontFamily = item.family
    return menu
  }
}