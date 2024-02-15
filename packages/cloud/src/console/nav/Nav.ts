import {className, div, id, text, View} from "@nutriadoc/classes"
import NavItem, {navItem} from "./NavItem.ts";

export default class Nav extends View {
  constructor() {
    super(
      undefined,
      className("console-nav", "flex", "flex-col"),
      div(
        id("items"),
        className("items", "flex", "flex-col"),
        navItem(id("dashboard"), text("Dashboard")),
        navItem(id("documents"), text("Documents"))
      )
    )
  }

  active(item: string) {

    const items = this.find(id("items"))
    items?.children?.forEach(item => (item as NavItem).deactive())


    const i = items?.find(id(item)) as NavItem | undefined
    i?.active()
  }
}