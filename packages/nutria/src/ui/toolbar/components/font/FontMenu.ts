import Position from "../../../../../../classes/src/ui/floating/Position.ts";
import DefaultMenuItem from "../../../menu/DefaultMenuItem.ts";
import Fonts from "../../../../editor/font/DefaultFonts.ts";
import Menu from "../../../menu/Menu.ts";
import {View} from "@nutriadoc/classes";

export default class FontMenu extends Menu {

  protected family: Map<string, string> = new Map()

  public constructor(_: View) {
    super('fontFamily', Position.BottomLeft, FontMenu.items())

    Fonts.forEach(font => {
      this.family.set(font.name, font.family)
    })
  }

  static items(): DefaultMenuItem[] {
    return Fonts.map(font => (FontMenu.createItem(font)))
  }

  public static createItem(item: {name: string, family: string}): DefaultMenuItem {
    const menuItem = new DefaultMenuItem(item.name, item.name)
    menuItem.key = item.name
    const name = (menuItem.nameElement as HTMLElement)
    name.style.fontFamily = item.family
    return menuItem
  }
}