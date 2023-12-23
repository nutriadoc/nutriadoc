import AbstractElement from "../../ui/AbstractElement"
import MainToolbarLayout from "./MainToolbarLayout"
import MainToolbarItem from "./MainToolbarItem"
import ItemEvent from "./events/ItemEvent"
import InsertMenu from "../../contextual_menu/insert/InsertMenu"
import ContextualMenuPosition from "../../contextual_menu/ContextualMenuPosition"

import "./MainToolbar.scss"


export default class MainToolbar extends AbstractElement {

  protected _layouts: MainToolbarLayout[]

  protected insertMenu?: InsertMenu

  public constructor(layout: MainToolbarLayout[]) {
    const element = document.createElement("div")
    element.classList.add("ntr-main-toolbar")
    super(element)
    this._layouts = layout

    this.items.forEach(item => {
      item.addEventListener("click", (event: Event) => {
        const e = event as ItemEvent
        if (!this.insertMenu) {
          this.insertMenu = new InsertMenu(e.item.element, ContextualMenuPosition.BottomLeft)
          this.addElement(this.insertMenu)
        }

        this.insertMenu.visible()
      })
    })
  }

  public active(key: string): void {
    const item = this.findItem(key)
    if (!item) return

    item.active()
  }

  public get items(): MainToolbarItem[] {
    const items: MainToolbarItem[] = []
    for (let layout of this._layouts) {
      items.push(...layout.items)
    }

    return items
  }

  public findItem(key: string): MainToolbarItem | undefined {
    let item: MainToolbarItem | undefined
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

  public static simple(): MainToolbar {
    return new MainToolbar([MainToolbarLayout.simple()])
  }
}