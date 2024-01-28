import MenuItem from "../MenuItem.ts";

export default class MenuItemEvent extends Event {

  public _item: MenuItem

  public constructor(type: string, item: MenuItem) {
    super(type)
    this._item = item
  }

  public get item(): MenuItem {
    return this._item
  }
}