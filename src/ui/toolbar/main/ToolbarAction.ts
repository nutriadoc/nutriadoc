import Toolbar from "./Toolbar.ts";
import ToolbarItem from "./items/ToolbarItem.ts";
import ToolbarItemEvent from "./events/ToolbarItemEvent.ts";
import Format, {keyToFormat} from "../../../editor/formatter/Format.ts";
import MenuEvent from "../../menu/events/MenuEvent.ts";
import {FontSizeManager} from "../../../editor/font/FontSize.ts";
import IFormatter from "../../../editor/formatter/IFormatter.ts";
import CommandEvent from "../../../editor/commands/CommandEvent.ts";

export default class ToolbarAction {

  protected toolbar: Toolbar

  protected formatter: IFormatter

  protected fontSizeManager: FontSizeManager = FontSizeManager.shared

  constructor(toolbar: Toolbar, formatter: IFormatter) {
    this.toolbar = toolbar
    this.formatter = formatter

    this.setupToolbarItemListener()
    this.setupMenuListener()
  }

  protected setupMenuListener() {
    this.toolbar.menus.forEach(menu => {
      menu.addEventListener("select", this.onMenuItemSelect.bind(this))
      menu.addEventListener("command", this.onMenuCommand.bind(this))
    })
  }

  setupToolbarItemListener() {
    this.toolbar.items.forEach(item => {
      item.addEventListener("click", this.onToolbarItemClick.bind(this))
      item.addEventListener("expand", this.onToolbarItemExpand.bind(this))
      item.addEventListener("command", this.onToolbarCommand.bind(this))

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

  protected onMenuCommand(event: Event) {
    const e = event as CommandEvent
    this.formatter.format(e.command.format, e.command)
  }

  protected onToolbarCommand(event: Event) {
    const e = event as CommandEvent
    this.formatter.format(e.command.format, e.command)
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

    if (item.isToggle)
      this.format(item.key, item.value)

    if (item.canExpand && !item.isToggle)
      this.toolbar.openMenu(item.key, item.element)
  }

  protected onMenuItemSelect(event: Event) {
    const e = event as MenuEvent
    const item = e.menuItem

    const menuKey = e.menu.key

    switch (menuKey) {
      case "insert":
      case "header": {
        if (item.key == "image") {
          this.onImageMenuItemSelect(event)
          break
        }
        this.format(item.key, null)
        break
      }
      case "font-size": {
        this.setFontSize(menuKey, item.value);
        break
      }
      case "align": {
        this.format(menuKey, item.key)
        break
      }
      default: {
        this.format(menuKey, item.value)
        break
      }
    }
  }

  protected onToolbarItemExpand(event: Event) {
    const e = event as ToolbarItemEvent
    const item = e.target as ToolbarItem

    this.toolbar.openMenu(item.key, item.element)
  }

  public format(key: string, value: any) {
    const format = keyToFormat(key)
    console.debug("format", key, value)

    this.formatter.format(format, value)
  }

  protected setFontSize(type: string, value: string) {
    let size: number
    let current = this.toolbar.findMenu("font-size")?.findActive()
    const toolbarItem = this.toolbar.findToolbarItem("font-size")
    let currentSize: number = parseInt(current?.key ?? toolbarItem?.text ?? "11")

    switch (type) {
      case "font-size": {
        size = parseInt(value)
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

  protected onImageMenuItemSelect(_: Event) {
    console.debug('on image menu item select')
    this.toolbar.document.uploadBehavior.selectFile()
  }
}