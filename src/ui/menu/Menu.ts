import Floating from "../floating/Floating.ts";
import Position from "../floating/Position.ts";
import MenuItemEvent from "./events/MenuItemEvent.ts";
import MenuEvent from "./events/MenuEvent.ts";
import MenuItem from "./MenuItem.ts";
import {className} from "../views.ts";

export default class Menu extends Floating {

  protected items: MenuItem[] = []

  public constructor(key: string, relativePosition: Position, items: MenuItem[]) {
    super(relativePosition, [], "element",)
    this.assignUnits(className("ntr-menu"))
    this.key = key
    this.items = items
    this.element.style.visibility = "hidden"
    this.addElement(this.items)
    this.setupItemsListener()
  }

  protected setupItemsListener() {
    this.items.forEach(item => {
      item.addEventListener("select", this.onMenuItemSelect.bind(this))
    })
  }

  protected onMenuItemSelect(event: Event) {
    const e = event as MenuItemEvent
    this.dispatchEvent(new MenuEvent(e.type, this, e.item))

    this.hidden()
  }

  public activeMenuItem(key: string) {
    this.items.forEach(item => {
      if (item.key === key) {
        item.active()
      } else {
        if (item.isActivated()) {
          item.deactivate()
        }
      }
    })
  }

  public findActive(): MenuItem | undefined {
    return this.items.find(item => item.isActivated())
  }

  public hidden() {
    super.hidden();

    this.items.forEach(item => {
      item.hiddenExpand()
    })
  }

}