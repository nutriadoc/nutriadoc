import {route} from "../decorators";
import {a, div, href, onClick, text, View} from "@nutriadoc/classes";
import RouteParameters from "../RouteParameters";
import {History} from "history";


@route("/post/:id")
export default class Post extends View {

  _parameter: RouteParameters

  history: History = {} as any

  constructor() {
    super(
      undefined,
      a(
        href("#"),
        text("Back"),
        onClick((e: Event) => {
          e.preventDefault()
          this.history.back()
        })
      ),
      div(text("Hello world")),
    )
  }

  set parameters(value: RouteParameters) {
    this._parameter = value
  }
}
