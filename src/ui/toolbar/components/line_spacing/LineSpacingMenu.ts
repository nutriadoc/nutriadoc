import Menu from "../../../menu/Menu.ts";
import MenuItem from "../../../menu/MenuItem.ts";
import DefaultMenuItem from "../../../menu/DefaultMenuItem.ts";
import Position from "../../../floating/Position.ts";
import Toolbar from "../../main/Toolbar.ts";
import View from "../../../View.ts";

export default class LineSpacingMenu extends Menu {

  protected toolbar: Toolbar

  public constructor(toolbar: Toolbar) {
    super('lineSpacing', Position.BottomLeft, LineSpacingMenu.createItems())

    this.toolbar = toolbar
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

  visible(relative?: HTMLElement | View | undefined, _container?: View) {
    super.visible(relative, this.toolbar);
  }

  static createItem(spacing: string): MenuItem {
    return new DefaultMenuItem(spacing, spacing)
  }
}