import Toolbar from "./Toolbar.ts";
import ToolbarItem from "./items/ToolbarItem.ts";
import ToolbarItemEvent from "./events/ToolbarItemEvent.ts";
import Formatter from "../../../editor/formatter/Formatter.ts";
import Format, {keyToFormat} from "../../../editor/formatter/Format.ts";
import MenuEvent from "../../menu/events/MenuEvent.ts";

export default class ToolbarAction {

  protected toolbar: Toolbar

  protected formatter: Formatter

  constructor(toolbar: Toolbar, formatter: Formatter) {
    this.toolbar = toolbar
    this.formatter = formatter

    this.setupToolbarItemListener()
  }

  setupToolbarItemListener() {
    this.toolbar.items.forEach(item => {
      item.addEventListener("click", this.onToolbarItemClick.bind(this))
    })
  }

  protected onToolbarItemClick(event: Event) {
    const e = event as ToolbarItemEvent
    const item = e.target as ToolbarItem

    const menu = this.toolbar.findMenu((item.key))
    if (!menu) return

    menu.relative = item.element
    menu.visible()
  }

  public selectMenuItem(event: Event) {
    const e = event as MenuEvent

    switch (e.menu.key) {
      case "styles": {
        this.onStylesMenuItemSelect(e)
        break
      }
      case "font": {
        this.onFontMenuItemSelect(e)
        break
      }
      case "font-size": {
        this.formatter.format(Format.FontSize, e.menuItem)
        break
      }
    }
  }

  protected onStylesMenuItemSelect(event: Event) {
    const e = event as MenuEvent
    const key = e.menuItem.key

    this.formatter.format(keyToFormat(key))
  }

  protected onFontMenuItemSelect(event: Event) {
    const e = event as MenuEvent
    this.formatter.format(Format.FontFamily, e.menuItem.key)
  }

}