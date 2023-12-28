import Menu from "../menu/Menu.ts";
import ToolbarItem from "./main/items/ToolbarItem.ts";

export default interface IToolbar {

  setToolbarItemText(key: string, label: string): void

  activeItem(key: string): void

  activeMenuItem(menuKey: string, itemKey: string): void

  deactiveItem(key: string): void

  findMenu(key: string): Menu | undefined

  findToolbarItem(key: string): ToolbarItem | undefined
}