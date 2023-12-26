import FloatingPosition from "../../floating/FloatingPosition.ts";
import InsertMenu from "../components/insert/InsertMenu.ts";
import MenuItemEvent from "../../menu/MenuItemEvent.ts";
import StylesMenu from "../components/styles/StylesMenu.ts";
import Toolbar from "./Toolbar.ts";
import ToolbarItem from "./items/ToolbarItem.ts";
import ToolbarItemEvent from "./events/ToolbarItemEvent.ts";
import Formatter from "../../../editor/formatter/Formatter.ts";
import Format, {keyToFormat} from "../../../editor/formatter/Format.ts";
import i18n from "../../../i18n";
import FontMenu from "../components/font/FontMenu.ts";
import {FontMenuEvent} from "../components/font/FontMenuEvent.ts";

export default class ToolbarAction {

  protected toolbar: Toolbar

  protected insertMenu?: InsertMenu

  protected stylesMenu?: StylesMenu

  protected fontMenu?: FontMenu

  protected listener: Map<string, Function> = new Map<string, Function>()

  protected formatter: Formatter

  constructor(toolbar: Toolbar, formatter: Formatter) {
    this.toolbar = toolbar
    this.formatter = formatter

    this.registerToolbarItemListener()
    this.setupToolbarItemListener()
  }

  registerToolbarItemListener() {
    this.listener.set("insert", this.onInsertMenuClick.bind(this))
    this.listener.set("styles", this.onStylesMenuClick.bind(this))
    this.listener.set("font", this.onFontMenuClick.bind(this))
  }

  setupToolbarItemListener() {
    this.toolbar.items.forEach(item => {
      item.addEventListener("click", (event: Event) => {
        const e = event as ToolbarItemEvent
        const item = e.target as ToolbarItem

        const listener = this.listener.get(item.key)
        listener?.(item)
        
      })
    })
  }

  protected onInsertMenuClick(item: ToolbarItem) {

    if (!this.insertMenu) {
      this.insertMenu = new InsertMenu(item.element, FloatingPosition.BottomLeft)
      this.toolbar.addElement(this.insertMenu)
    }

    this.insertMenu.visible()
  }

  protected onStylesMenuClick(item: ToolbarItem) {
    if (!this.stylesMenu) {
      this.stylesMenu = new StylesMenu(item.element, FloatingPosition.BottomLeft)
      this.stylesMenu.addEventListener('select', this.onStylesMenuItemSelect.bind(this))
      this.toolbar.addElement(this.stylesMenu)
    }

    this.stylesMenu.visible()
  }

  protected onStylesMenuItemSelect(event: Event) {
    const e = event as MenuItemEvent
    const key = e.item.key

    this.formatter.format(keyToFormat(key))
  }

  public activeStyles(format: Format) {
    const key = Format[format]
    const camelCaseKey = key.charAt(0).toLowerCase() + key.slice(1)
    const n = parseInt(key.substring(7, 8))

    let i18nKey: string
    let label: string
    switch (key) {
      case "Title":
      case "Subtitle":
      case "NormalText": {
        i18nKey = `menu.styles.${camelCaseKey}`
        label = i18n.t(i18nKey)
        break;
      }
      default: {
        i18nKey = `menu.styles.heading`
        label = `${i18n.t(i18nKey)} ${n}`
        break;
      }
    }

    const item = this.toolbar.findItem("styles")
    item?.setLabel(label)
  }

  protected onFontMenuClick(item: ToolbarItem) {
    if (!this.fontMenu) {
      this.fontMenu = new FontMenu(item.element, FloatingPosition.BottomLeft)
      this.fontMenu.addEventListener('select', this.onFontMenuItemSelect.bind(this))
      this.toolbar.addElement(this.fontMenu)
    }

    this.fontMenu.visible()
  }

  protected onFontMenuItemSelect(event: Event) {
    const e = event as FontMenuEvent

    this.formatter.format(Format.FontFamily, e.font.name)
  }

  public activeFont(font: string) {
    const item = this.toolbar.findItem("font")
    item?.setLabel(font)
    this.fontMenu?.active(font)
  }
}