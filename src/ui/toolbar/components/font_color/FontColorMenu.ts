import Menu from "../../../menu/Menu.ts";
import FloatingPosition from "../../../floating/FloatingPosition.ts";
import MenuItem from "../../../menu/MenuItem.ts";
import ColorPicker from "../../../color_picker/ColorPicker.ts";
import InactiveMenuItem from "../../../menu/InactiveMenuItem.ts";

import "./FontColorMenu.scss"

export default class FontColorMenu extends Menu {
  public constructor() {
    super('color', FloatingPosition.BottomLeft, [FontColorMenu.createColorPickerItem()])
    this._element.classList.add("color-menu")
  }

  static createColorPickerItem(): MenuItem {
    const picker = new ColorPicker()
    const menuItem = new InactiveMenuItem("one");
    menuItem.addElement(picker)

    menuItem.element.classList.add("one")

    return menuItem
  }
}