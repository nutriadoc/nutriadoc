import View from "../../ui/View.ts"
import ToolbarLayout from "./ToolbarLayout.ts"
import ToolbarItem from "./items/ToolbarItem.ts"
import InsertMenu from "../components/insert/InsertMenu"

import "./Toolbar.scss"
import ToolbarAction from "./ToolbarAction"
import Formatter from "../../formatter/Formatter.ts";


export default class Toolbar extends View {

  protected _layouts: ToolbarLayout[]

  protected insertMenu?: InsertMenu

  protected action: ToolbarAction

  public constructor(layout: ToolbarLayout[], formatter: Formatter) {
    const element = document.createElement("div")
    element.classList.add("ntr-main-toolbar")
    super(element)
    this._layouts = layout

    this.action = new ToolbarAction(this, formatter)
    formatter.toolbarAction = this.action
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

  public static simple(formatter: Formatter): Toolbar {
    return new Toolbar([ToolbarLayout.simple()], formatter)
  }
}