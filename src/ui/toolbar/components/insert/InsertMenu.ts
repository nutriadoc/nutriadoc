import i18n from "../../../../i18n"
import Position from "../../../floating/Position.ts"
import DefaultMenuItem from "../../../menu/DefaultMenuItem.ts";
import Menu from "../../../menu/Menu.ts";
import TableMenu from "../table/TableMenu.ts";
import View from "../../../View.ts";
import MenuItem from "../../../menu/MenuItem.ts";
import GridPickerEvent from "../../../grid_picker/GridPickerEvent.ts";
import CommandEvent from "../../../../editor/commands/CommandEvent.ts";
import InsertTableCommand from "../../../../editor/commands/InsertTableCommand.ts";

import "./InsertMenu.scss"

interface CreateInsertTableMenuItem {

  items: MenuItem[]

  tableMenu: TableMenu

}

export default class InsertMenu extends Menu {

  protected tableMenu: TableMenu

  public constructor(container: View) {
    const create = InsertMenu.items(container)
    super("insert", Position.BottomLeft, create.items)
    this._element.classList.add("insert-menu")

    this.tableMenu = create.tableMenu
    this.tableMenu.addEventListener("pick", this.onTablePick.bind(this))
  }

  protected onTablePick(event: Event) {
    const e = event as GridPickerEvent
    this.dispatchEvent(new CommandEvent(new InsertTableCommand(e.cell.row, e.cell.column)))
  }

  public static items(container: View): CreateInsertTableMenuItem {

    const tableMenu = new TableMenu(container)

    const items = [
      {
        key: "image",
        icon: "image",
        name: i18n.t("menu.picture"),
        canExpand: false,
      },
      {
        key: "table",
        icon: "table",
        name: i18n.t("menu.table"),
        expand: tableMenu,
      },
      {
        key: "hr",
        icon: "dash-square",
        name: i18n.t("menu.horizontalRule"),
        canExpand: false,
      }
    ].map(item => this.createItem(item))

    return {
      items,
      tableMenu
    }
  }

  public static createItem(item: any): DefaultMenuItem {
    let canExpand = item.canExpand
    let expand: View | undefined = undefined
    if (item.expand) {
      canExpand = true
      expand = item.expand
    }
    const menuItem = new DefaultMenuItem(item.key, item.name, canExpand, item.icon)
    menuItem.expand = expand
    return menuItem
  }
}