import Menu from "../../../menu/Menu.ts";
import Position from "../../../floating/Position.ts";
import MenuItem from "../../../menu/MenuItem.ts";
import InactiveMenuItem from "../../../menu/InactiveMenuItem.ts";
import GridPicker from "../../../grid_picker/GridPicker.ts";
import View from "../../../View.ts";
import GridPickerEvent from "../../../grid_picker/GridPickerEvent.ts";

export default class TableMenu extends Menu {

  protected gridPicker: GridPicker

  constructor(container: View) {
    const item = TableMenu.createItem()
    super("insert-table", Position.RightTop, [item]);
    this.zIndex = this._zIndex + 1

    this.gridPicker = item.children[0] as GridPicker
    this.gridPicker.addEventListener("pick", this.onGridPick.bind(this))

    container.addElement(this)

    this.setupEvents()
  }

  protected onGridPick(event: Event) {
    const e = event as GridPickerEvent
    this.dispatchEvent(new GridPickerEvent(e.picker, e.cell))
    this.hidden()
  }

  protected setupEvents() {
    this.element.addEventListener('mouseenter', this.onMouseEnter.bind(this))
    this.element.addEventListener('mouseleave', this.onMouseLeave.bind(this))
  }

  protected onMouseEnter() {

  }

  protected onMouseLeave() {
    this.dispatchEvent(new Event("leave"))
  }

  static createItem(): MenuItem {
    const item = new InactiveMenuItem("table")
    item.element.style.padding = "0px 10px"
    const grid = new GridPicker(10, 10, true)
    item.addElement(grid)

    return item
  }
}