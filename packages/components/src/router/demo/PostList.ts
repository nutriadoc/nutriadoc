import {route} from "../decorators";
import {a, div, href, onClick, text, View} from "@nutriadoc/classes";
import {History} from "history";

@route("/posts")
export default class PostList extends View {

  history: History = {} as any

  render(): Node | Node[] {
    this.assignUnits(
      div(
        a(
          href("#"),
          onClick((e: Event) => { this.history.push("/post/1"); e.preventDefault() }),
          text("Hello world")
        )
      )
    )
    return super.render();
  }
}