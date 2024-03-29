import Menu from "../menu/Menu.ts";
import ToolbarItem from "./main/items/ToolbarItem.ts";
import Range from "../../editor/Range.ts";

export default interface IToolbar {

  onEditorSelectionChange(range: Range): void

  setToolbarItemText(key: string, label: string): void

  activeItem(key: string): void

  activeMenuItem(menuKey: string, itemKey: string): void

  enableToolbarItem(key: string): void

  disableToolbarItem(key: string): void

  deactiveItem(key: string): void

  findMenu(key: string): Menu | undefined

  findToolbarItem(key: string): ToolbarItem | undefined
}