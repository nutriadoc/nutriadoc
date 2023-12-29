import View from "../../View.ts"
import ToolbarLayout from "./ToolbarLayout.ts"
import ToolbarItem from "./items/ToolbarItem.ts"
import InsertMenu from "../components/insert/InsertMenu.ts"
import ToolbarAction from "./ToolbarAction.ts"
import StylesMenu from "../components/styles/StylesMenu.ts";
import FontMenu from "../components/font/FontMenu.ts";
import FontSizeMenu from "../components/font_size/FontSizeMenu.ts"
import Menu from "../../menu/Menu.ts";
import IToolbar from "../IToolbar.ts";
import Tooltip from "../../tooltip/Tooltip.ts";
import FontColorMenu from "../components/font_color/FontColorMenu.ts";
import HighlightMenu from "../components/hightlight/HighlightMenu.ts";
import AlignMenu from "../components/align/AlignMenu.ts";
import LineSpacingMenu from "../components/line_spacing/LineSpacingMenu.ts";

import "./Toolbar.scss"

export default class Toolbar extends View implements IToolbar{

  protected _layouts: ToolbarLayout[]

  public action?: ToolbarAction

  protected _menus: Menu[] = []

  protected _tooltip: Tooltip

  protected menuClasses: any[] = [
    InsertMenu,
    StylesMenu,
    FontMenu,
    FontSizeMenu,
    FontColorMenu,
    HighlightMenu,
    AlignMenu,
    LineSpacingMenu,
  ]

  public constructor(layout: ToolbarLayout[]) {
    const element = document.createElement("div")
    element.classList.add("ntr-main-toolbar")
    super(element)
    this._layouts = layout
    this._tooltip = new Tooltip("")
    this.setupMenus()
  }

  public openMenu(key: string, element: HTMLElement) {
    const menu = this.findMenu(key)
    if (!menu) return

    menu.relative = element
    menu.visible()
  }

  setToolbarItemText(key: string, label: string): void {
    const item = this.findToolbarItem(key)
    if (!item) return
    item.value = label
  }

  activeItem(key: string): void {
    const menu = this.findMenu(key)
    if (!menu)
      this.activeToolbarItem(key)

    menu?.activeMenuItem(key)
  }

  deactiveItem(key: string): void {
    this.findToolbarItem(key)?.deactivate()
  }

  protected setupMenus() {
    this._menus = this.menuClasses.map(menuClass => {
      const menu = new menuClass(this)
      this.addElement(menu)
      return menu
    })
  }

  public activeToolbarItem(key: string): void {
    const item = this.findToolbarItem(key)
    if (!item) return

    item.active()
  }

  public activeMenuItem(menuKey: string, itemKey: string): void {
    this.findMenu(menuKey)?.activeMenuItem(itemKey)
  }

  public get items(): ToolbarItem[] {
    const items: ToolbarItem[] = []
    for (let layout of this._layouts) {
      items.push(...layout.items)
    }

    return items
  }

  public set value(value: any) {
    this.items.forEach(item => {
      item.value = value
    })
  }

  public findToolbarItem(key: string): ToolbarItem | undefined {
    let item: ToolbarItem | undefined
    for (let layout of this._layouts) {
      item = layout.findItem(key)
      if (!!item) {
        break
      }
    }

    return item

  }

  enableToolbarItem(key: string): void {
    this.findToolbarItem(key)?.enable()
  }

  disableToolbarItem(key: string): void {
    this.findToolbarItem(key)?.disable()
  }

  public render(): Node | Node[] {
    this.addElement(this._layouts)
    this.addElement(this._tooltip)

    return this._element
  }

  public findMenu(key: string): Menu | undefined {
    return this._menus.find(menu => menu.key === key)
  }

  public get tooltip(): Tooltip {
    return this._tooltip
  }

  public get menus(): Menu[] {
    return this._menus
  }

  public static simple(): Toolbar {
    return new Toolbar([ToolbarLayout.simple()])
  }
}