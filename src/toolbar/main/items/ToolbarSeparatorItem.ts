import ToolbarItem from "./ToolbarItem.ts";

export class ToolbarSeparatorItem extends ToolbarItem {
  constructor() {
    super("separator", "", false);
    
    this._element.classList.add("separator");
  }
}