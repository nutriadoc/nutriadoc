import Menu from "../../../menu/Menu.ts";
import MenuItem from "../../../menu/MenuItem.ts";
import DefaultMenuItem from "../../../menu/DefaultMenuItem.ts";
import FloatingPosition from "../../../floating/FloatingPosition.ts";

export default class LineSpacingMenu extends Menu {

  public constructor() {
    super('lineSpacing', FloatingPosition.BottomLeft, LineSpacingMenu.createItems())
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