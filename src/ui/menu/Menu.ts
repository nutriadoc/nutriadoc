import Floating from "../floating/Floating.ts";
import FloatingPosition from "../floating/FloatingPosition.ts";
import MenuItem from "./MenuItem.ts";
import MenuItemEvent from "./events/MenuItemEvent.ts";
import MenuEvent from "./events/MenuEvent.ts";

export default class Menu extends Floating {
  protected items: MenuItem[] = []

  public constructor(key: string, relativePosition: FloatingPosition, items: MenuItem[]) {
    super(relativePosition)
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

  public active(key: string) {
    this.items.forEach(item => {
      if (item.key === key) {
        item.active()
      } else {
        if (item.isActivated()) {
          item.deactive()
        }
      }
    })
  }

  public findActive(): MenuItem | undefined {
    return this.items.find(item => item.isActivated())
  }

}