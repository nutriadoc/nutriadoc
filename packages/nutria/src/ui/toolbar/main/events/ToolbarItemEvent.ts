import ToolbarItem from "../items/ToolbarItem.ts";

export default class ToolbarItemEvent extends Event {

  protected _item: ToolbarItem

  constructor(type: string, item: ToolbarItem) {
    super(type)
    this._item = item
  }

  public get item(): ToolbarItem {
    return this._item
  }

  clone() {
    return new ToolbarItemEvent(this.type, this._item)
  }
}