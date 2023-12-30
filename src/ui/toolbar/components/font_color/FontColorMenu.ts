import Menu from "../../../menu/Menu.ts";
import Position from "../../../floating/Position.ts";
import MenuItem from "../../../menu/MenuItem.ts";
import ColorPicker from "../../../color_picker/ColorPicker.ts";
import InactiveMenuItem from "../../../menu/InactiveMenuItem.ts";
import MenuEvent from "../../../menu/events/MenuEvent.ts";
import ColorEvent from "../../../color_picker/ColorEvent.ts";

import "./FontColorMenu.scss"

export default class FontColorMenu extends Menu {

  public colorPicker: ColorPicker

  protected one: MenuItem

  public constructor(key?: string) {
    super(key ?? 'color', Position.BottomLeft, [FontColorMenu.createColorPickerItem()])

    this.one = this.items[0]
    this.colorPicker = this.one.children[0] as ColorPicker
    this._element.classList.add("color-menu")

    this.colorPicker.addEventListener("click", this.onColorPickerClick.bind(this))
  }

  protected onColorPickerClick(event: Event) {
    const colorEvent = event as ColorEvent
    this.one.value = colorEvent.color
    const e = new MenuEvent("select", this, this.one)
    // this.onMenuItemSelect(e)
    this.dispatchEvent(e)
    this.hidden()
  }

  static createColorPickerItem(): MenuItem {
    const picker = new ColorPicker()
    const menuItem = new InactiveMenuItem("one")
    menuItem.addElement(picker)

    menuItem.element.classList.add("one")

    return menuItem
  }
}