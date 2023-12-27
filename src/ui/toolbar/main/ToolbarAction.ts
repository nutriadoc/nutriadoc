import Toolbar from "./Toolbar.ts";
import ToolbarItem from "./items/ToolbarItem.ts";
import ToolbarItemEvent from "./events/ToolbarItemEvent.ts";
import Format, {keyToFormat} from "../../../editor/formatter/Format.ts";
import MenuEvent from "../../menu/events/MenuEvent.ts";
import DefaultMenuItem from "../../menu/DefaultMenuItem.ts";
import Menu from "../../menu/Menu.ts";
import {FontSizeManager} from "../../../editor/font/FontSize.ts";
import IFormatter from "../../../editor/formatter/IFormatter.ts";

export default class ToolbarAction {

  protected toolbar: Toolbar

  protected formatter: IFormatter

  protected fontSizeManager: FontSizeManager = FontSizeManager.shared

  constructor(toolbar: Toolbar, formatter: IFormatter) {
    this.toolbar = toolbar
    this.formatter = formatter

    this.setupToolbarItemListener()
  }

  setupToolbarItemListener() {
    this.toolbar.items.forEach(item => {
      item.addEventListener("click", this.onToolbarItemClick.bind(this))
      item.addEventListener("expand", this.onToolbarItemExpand.bind(this))

      this.setupItemMouseEvent(item)
    })
  }

  protected setupItemMouseEvent(item: ToolbarItem): void {
    item.element.addEventListener("mouseenter", () => {
      this.onItemMouseEnter(item)
    })

    item.element.addEventListener("mouseleave", () => {
      this.onItemMouseLeave(item)
    })
  }

  protected onItemMouseEnter(item: ToolbarItem): void {
    this.toolbar.tooltip.content = item.description
    this.toolbar.tooltip.visible(item)
  }

  protected onItemMouseLeave(_: ToolbarItem): void {
    this.toolbar.tooltip.hidden()
  }

  protected onToolbarItemClick(event: Event) {
    const e = event as ToolbarItemEvent
    const item = e.target as ToolbarItem

    if (item.isToggle && !item.canExpand)
      this.selectMenuItem(new Event(item.key))

    this.toolbar.openMenu(item.key, item.element)
  }

  protected onToolbarItemExpand(event: Event) {
    this.onToolbarItemClick(event)
  }

  public selectMenuItem(event: Event) {
    const e: MenuEvent | undefined = event as MenuEvent
    console.debug("select menu item", e)

    switch (e.type) {
      case "styles": {
        this.onStylesMenuItemSelect(e!)
        break
      }
      case "font": {
        this.onFontMenuItemSelect(e!)
        break
      }
      case "increase-font-size":
      case "decrease-font-size":
      case "font-size": {
        this.setFontSize(e.type, e.menu, e.menuItem)
        break
      }
      default: {
        const format = keyToFormat(e.type)
        const toolbarItem = this.toolbar.findItem(e.type)
        this.formatter.format(format, !toolbarItem?.isActive)
        break
      }
    }
  }

  protected setFontSize(type: string, _menu?: Menu, menuItem?: DefaultMenuItem) {
    let size: number
    let current = this.toolbar.findMenu("font-size")?.findActive()
    const toolbarItem = this.toolbar.findItem("font-size")
    let currentSize: number = parseInt(current?.key ?? toolbarItem?.text ?? "11")

    switch (type) {
      case "font-size": {
        if (!menuItem) return
        size = parseInt(menuItem!.key)
        break
      }
      case "increase-font-size": {
        size = this.fontSizeManager.next(currentSize)?.size ?? currentSize + 10
        break
      }
      case "decrease-font-size": {
        size = this.fontSizeManager.previous(currentSize)?.size ?? (currentSize - 1)
        if (size < 1) size = 1
        break
      }
      default: {
        size = 11
      }
    }

    this.formatter.format(Format.FontSize, size)
  }

  protected onStylesMenuItemSelect(event: Event) {
    const e = event as MenuEvent
    const key = e.menuItem?.key
    if (!key)
      return

    this.formatter.format(keyToFormat(key))
  }

  protected onFontMenuItemSelect(event: Event) {
    const e = event as MenuEvent
    if (!e?.menuItem) return
    this.formatter.format(Format.FontFamily, e.menuItem.key)
  }

}