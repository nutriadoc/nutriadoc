import Menu from "../../../menu/Menu.ts";
import MenuItem from "../../../menu/MenuItem.ts";
import DefaultMenuItem from "../../../menu/DefaultMenuItem.ts";
import Position from "../../../floating/Position.ts";

export default class LineSpacingMenu extends Menu {

  public constructor() {
    super('lineSpacing', Position.BottomLeft, LineSpacingMenu.createItems())
  }

  static createItems(): MenuItem[] {
    return [
      "1",
      "1.15",
      "1.3",
      "1.5",
      "2",
      "3"
    ].map(LineSpacingMenu.createItem)
  }

  static createItem(spacing: string): MenuItem {
    return new DefaultMenuItem(spacing, spacing)
  }
}