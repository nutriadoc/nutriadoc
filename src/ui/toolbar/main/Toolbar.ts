import View from "../../View.ts"
import ToolbarAccordionLayout from "./ToolbarAccordionLayout.ts"
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
import IFormatter from "../../../editor/formatter/IFormatter.ts";
import ToolbarSizeChangeEvent from "./events/ToolbarSizeChangeEvent.ts";
import MoreToolbarItemMenu from "../components/more_toolbar_item_menu/MoreToolbarItemMenu.ts";
import Range from "../../../editor/Range.ts"

import "./Toolbar.scss"


export default class Toolbar extends View implements IToolbar {

  protected _layouts: ToolbarAccordionLayout[]

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
    MoreToolbarItemMenu,
  ]

  public constructor(layout: ToolbarAccordionLayout[]) {
    const element = document.createElement("div")
    element.classList.add("ntr-main-toolbar")
    super(element)

    this._layouts = layout
    this._tooltip = new Tooltip("")

    this.setupMenus()
    this.setupMonitorToolbarSizeChange()
  }

  onEditorSelectionChange(_: Range): void {

  }

  protected setupMonitorToolbarSizeChange() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(
        mutation => mutation.addedNodes
          .forEach(node => {
            const element = node as HTMLElement
            if (!element.classList.contains("layout")) return

            this.monitorToolbarSizeChange(element)

          }))
    })
    observer.observe(this._element, {
      childList: true,
    })
  }

  protected monitorToolbarSizeChange(element: HTMLElement) {
    const observer = new ResizeObserver(_ => {
      this.layout.layout(element.offsetWidth)
      this.dispatchEvent(new ToolbarSizeChangeEvent())
    })
    observer.observe(element)
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

  get layout(): ToolbarAccordionLayout {
    return this._layouts[0]
  }

  public static simple(formatter: IFormatter): Toolbar {
    const layout = ToolbarAccordionLayout.simple()
    const toolbar = new Toolbar([layout])
    toolbar.action = new ToolbarAction(toolbar, formatter)

    layout.sortItems()

    return toolbar
  }
}