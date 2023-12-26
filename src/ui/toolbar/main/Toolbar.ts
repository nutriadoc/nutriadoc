import View from "../../View.ts"
import ToolbarLayout from "./ToolbarLayout.ts"
import ToolbarItem from "./items/ToolbarItem.ts"
import InsertMenu from "../components/insert/InsertMenu.ts"
import ToolbarAction from "./ToolbarAction.ts"
import StylesMenu from "../components/styles/StylesMenu.ts";
import FontMenu from "../components/font/FontMenu.ts";
import FontSizeMenu from "../components/font_size/FontSizeMenu.ts"
import Menu from "../../menu/Menu.ts";

import "./Toolbar.scss"


export default class Toolbar extends View {

  protected _layouts: ToolbarLayout[]

  public action?: ToolbarAction

  protected _menus: Menu[] = []

  protected menuClasses: any[] = [
    InsertMenu,
    StylesMenu,
    FontMenu,
    FontSizeMenu
  ]

  public constructor(layout: ToolbarLayout[]) {
    const element = document.createElement("div")
    element.classList.add("ntr-main-toolbar")
    super(element)
    this._layouts = layout

    this.setupMenus()
  }

  protected setupMenus() {
    this._menus = this.menuClasses.map(menuClass => {
      const menu = new menuClass()
      this.addElement(menu)
      menu.addEventListener("select", this.onMenuItemSelect.bind(this))
      return menu
    })
  }

  protected onMenuItemSelect(event: Event) {
    this.action?.selectMenuItem(event)
  }

  public active(key: string): void {
    const item = this.findItem(key)
    if (!item) return

    item.active()
  }

  public get items(): ToolbarItem[] {
    const items: ToolbarItem[] = []
    for (let layout of this._layouts) {
      items.push(...layout.items)
    }

    return items
  }

  public findItem(key: string): ToolbarItem | undefined {
    let item: ToolbarItem | undefined
    for (let layout of this._layouts) {
      item = layout.findItem(key)
      if (!!item) {
        break
      }
    }

    return item

  }

  public render(): Node | Node[] {
    this.addElement(this._layouts)

    return this._element
  }

  public findMenu(key: string): Menu | undefined {
    return this._menus.find(menu => menu.key === key)
  }

  public static simple(): Toolbar {
    return new Toolbar([ToolbarLayout.simple()])
  }
}