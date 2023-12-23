import MainToolbarItem from "../MainToolbarItem";

export default class ItemEvent extends Event {

  protected _item: MainToolbarItem

  constructor(type: string, item: MainToolbarItem) {
    super(type)
    this._item = item
  }

  public get item(): MainToolbarItem {
    return this._item
  }
}