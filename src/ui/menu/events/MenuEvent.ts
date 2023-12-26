import Menu from "../Menu.ts";
import MenuItem from "../MenuItem.ts";

export default class MenuEvent extends Event {

  protected _menu: Menu

  protected _menuItem: MenuItem

  public constructor(type: string, menu: Menu, menuItem: MenuItem) {
    super(type);
    this._menu = menu
    this._menuItem = menuItem
  }

  public get menu(): Menu {
    return this._menu
  }

  public get menuItem(): MenuItem {
    return this._menuItem
  }
}