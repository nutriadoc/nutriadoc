import {div, text, View} from "@nutriadoc/classes"
import {route} from "@nutriadoc/components";

@route("/iframe.html")
@route("/console/")
export default class Dashboard extends View {
  render(): Node | Node[] {
    if (this._rendered) return super.render()

    this.assignUnits(div(text("Dashboard")))

    return super.render();
  }
}