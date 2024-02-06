import {route} from "../decorators";
import RouteView from "../RouteView";

@route("/iframe.html")
@route("/")
export default class Home extends RouteView {

  constructor() {
    super(
      undefined,

    )
  }
}