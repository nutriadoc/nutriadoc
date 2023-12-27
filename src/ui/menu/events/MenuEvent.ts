import Menu from "../Menu.ts";
import DefaultMenuItem from "../DefaultMenuItem.ts";

export default class MenuEvent extends Event {

  protected _menu: Menu

  protected _menuItem: DefaultMenuItem

  public constructor(type: string, menu: Menu, menuItem: DefaultMenuItem) {
    super(type);
    this._menu = menu
    this._menuItem = menuItem
  }

  public get menu(): Menu {
    return this._menu
  }

  public get menuItem(): DefaultMenuItem {
    return this._menuItem
  }

  public get type(): string {
    return this._menu.key
  }
}