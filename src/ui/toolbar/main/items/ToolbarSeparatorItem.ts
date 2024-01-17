import ToolbarItem from "./ToolbarItem.ts";

export class ToolbarSeparatorItem extends ToolbarItem {
  constructor() {
    super("separator", "", false, undefined, false);
    this.button.disable()
    this._element.classList.add("separator");
  }

  protected setupEvents() {

  }

  get width(): number {
    return 13
  }

  render(): Node | Node[] {
    return []
  }
}