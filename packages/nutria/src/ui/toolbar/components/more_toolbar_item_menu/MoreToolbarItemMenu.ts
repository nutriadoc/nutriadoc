import Menu from "../../../menu/Menu.ts"
import ToolbarAccordionLayout from "../../main/ToolbarAccordionLayout.ts";
import Toolbar from "../../main/Toolbar.ts";
import Layout from "../../main/Layout.ts";
import ToolbarItem from "../../main/items/ToolbarItem.ts";
import { className, style, Direction, Measurable, View, Position } from "@nutriadoc/classes";

export default class MoreToolbarItemMenu extends Menu {

  protected _items: Measurable[] = []

  protected toolbar: Toolbar

  constructor(toolbar: Toolbar) {
    super("more_toolbar_item_menu", Position.BottomCenter, [])
    this.toolbar = toolbar

    this.assignUnits(
      className("toolbar-more-menu", "ntr-main-toolbar"),
      style({
        paddingLeft: "10px",
        paddingRight: "10px",
      })
    )
    this.remove()
  }

  visible(relative?: HTMLElement | View | undefined, _?: View) {
    relative = this.floating.relative!
    this.removeAllChild()

    const view = View.find(relative as Node)
    if (!view) return

    const layout = view.parent as ToolbarAccordionLayout

    let collapses = layout.getCollapsed()

    if (collapses[0] instanceof ToolbarItem) {
      let c = [...collapses]
      collapses = [
        new Layout(Direction.Horizontal)
      ]
      c.forEach(item => { item.render(); collapses[0].addItem(item) })
      collapses[0].add(c)
    }

    this.add(collapses)

    let width = document.body.offsetWidth
    let maxWidthOfLayout = 0

    collapses.forEach(collapse => {
      if (collapse instanceof Layout) {
        if (collapse.width > maxWidthOfLayout) {
          maxWidthOfLayout = collapse.width
        }
      }
    })

    if (maxWidthOfLayout < width) {
      width = maxWidthOfLayout
    } else {
      width = width - 40
    }

    this.element.style.width = `${width}px`

    super.visible(relative, this.toolbar)
  }
}