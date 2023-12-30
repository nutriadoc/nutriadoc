import Menu from "../../../menu/Menu.ts";
import Position from "../../../floating/Position.ts";
import DefaultMenuItem from "../../../menu/DefaultMenuItem.ts";
import {fontSizes} from "../../../../editor/font/FontSize.ts";

export default class FontSizeMenu extends Menu {
  public constructor() {
    super("font-size", Position.BottomLeft, FontSizeMenu.createItems());

    this.element.style.width = "80px"
    this.element.style.overflowX = "hidden"

  }

  public static createItems(): DefaultMenuItem[] {
    return fontSizes().map(size => new DefaultMenuItem(size.size.toString(), size.name))
  }
}