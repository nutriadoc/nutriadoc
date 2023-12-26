import Menu from "../../../menu/Menu.ts";
import FloatingPosition from "../../../floating/FloatingPosition.ts";
import MenuItem from "../../../menu/MenuItem.ts";
import {fontSizes} from "../../../../editor/font/FontSize.ts";

export default class FontSizeMenu extends Menu {
  public constructor() {
    super("font-size", FloatingPosition.BottomLeft, FontSizeMenu.createItems());

    this.element.style.width = "80px"
    this.element.style.overflowX = "hidden"

  }

  public static createItems(): MenuItem[] {
    return fontSizes().map(size => new MenuItem(size.size.toString(), size.name))
  }
}