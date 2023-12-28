import ToolbarItem from "./ToolbarItem.ts";

export default class ToolbarColorItem extends ToolbarItem {
  public get value(): any {
    return this.button.icon?.color
  }

  public set value(value: any) {
    this.button.icon!.color = value
  }
}