import {EventListenerUnit} from "@nutriadoc/classes"
import {RouteView} from "./index";

export default class BackListener extends EventListenerUnit {

  protected routeView: RouteView

  constructor(routeView: RouteView) {
    super("click", (e: Event) => {
      this.onClick(e)
    })

    this.routeView = routeView
  }

  onClick(event: Event) {
    event.preventDefault()

    this.routeView.history.back()
  }
}