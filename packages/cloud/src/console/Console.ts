import {className, id, View} from "@nutriadoc/classes"
import Nav from "./nav/Nav.ts"
import {RouterContainer, routerContainer} from "@nutriadoc/components"
import Dashboard from "./dashboard/Dashboard.ts"
import DocumentList from "./document/list/DocumentList.ts"
import { History } from 'history'

import "./index.scss"

export default class Console extends View {

  protected navItemClickHandler = this.onNavItemClick.bind(this)

  protected nav: Nav

  constructor() {
    const nav = new Nav()
    super(
      undefined,
      className("console", "flex", "flex-row", "flex-1"),
      nav,
      routerContainer(
        Dashboard,
        DocumentList,
        id("routerContainer"),
        className("console-router", "flex", "flex-col")
      )
    )

    this.nav = nav
    nav.element.addEventListener("click", this.navItemClickHandler)
  }

  get routerContainer() {
    return this.find(id("routerContainer")) as RouterContainer
  }

  get history(): History {
    return this.routerContainer.router.history
  }

  onNavItemClick(event: Event) {
    const { id } = event.target as HTMLElement

    if (id == 'documents') {
      this.history.push("/console/documents")
    }

    this.nav.active(id)
  }

}