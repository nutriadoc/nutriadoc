import {EventListenerUnit} from "@nutriadoc/classes"
import {RouteView} from "./index";

export default class PushListener extends EventListenerUnit {

  protected target: string

  protected routeView: RouteView

  constructor(target: string, routeView: RouteView) {
    super("click", (e: Event) => {
      this.onClick(e)
    })

    this.target = target
    this.routeView = routeView
  }

  onClick(event: Event) {
    event.preventDefault()

    this.routeView.history.push(this.target)
  }
}