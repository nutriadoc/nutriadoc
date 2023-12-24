import FloatingPosition from "../../ui/floating/FloatingPosition.ts";
import InsertMenu from "../components/insert/InsertMenu";
import MenuItemEvent from "../components/menu/MenuItemEvent";
import StylesMenu from "../components/styles/StylesMenu";
import Toolbar from "./Toolbar.ts";
import ToolbarItem from "./items/ToolbarItem.ts";
import ToolbarItemEvent from "./events/ToolbarItemEvent.ts";
import Formatter from "../../formatter/Formatter.ts";
import Format from "../../formatter/Format.ts";
import i18n from "../../i18n";

export default class ToolbarAction {

  protected toolbar: Toolbar

  protected insertMenu?: InsertMenu

  protected stylesMenu?: StylesMenu

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
    let format:Format = Format.Heading1


    switch (key) {
      case "heading1":
        format = Format.Heading1
        break;
      case "heading2":
        format = Format.Heading2
        break;
      case "heading3":
        format = Format.Heading3
        break;
      case "heading4":
        format = Format.Heading4
        break;
      case "heading5":
        format = Format.Heading5
        break;
      case "heading6":
        format = Format.Heading6
        break;
      case "title":
        format = Format.Title
        break;
      case "subtitle":
        format = Format.Subtitle
        break;
    }

    this.formatter.format(format)
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
}