import DefaultMenuItem from "../DefaultMenuItem.ts";

export default class MenuItemEvent extends Event {

  public _item: DefaultMenuItem

  public constructor(type: string, item: DefaultMenuItem) {
    super(type)
    this._item = item
  }

  public get item(): DefaultMenuItem {
    return this._item
  }
}