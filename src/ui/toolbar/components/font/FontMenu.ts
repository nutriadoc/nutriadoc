import FloatingPosition from "../../../floating/FloatingPosition.ts";
import MenuItem from "../../../menu/MenuItem.ts";
import Fonts from "../../../../editor/font/DefaultFonts.ts";
import Menu from "../../../menu/Menu.ts";

export default class FontMenu extends Menu {

  protected items: MenuItem[] = []

  protected family: Map<string, string> = new Map()

  public constructor(relativePosition: FloatingPosition) {
    super('font', relativePosition, FontMenu.items())

    Fonts.forEach(font => {
      this.family.set(font.name, font.family)
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