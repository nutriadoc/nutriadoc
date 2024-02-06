import {a, div, href, id, onClick, text, View} from "@nutriadoc/classes";
import {History} from "history";
import {Container, routerContainer} from "../index";
import { Home, PostList, Post} from "./index";

export default class Main extends View {

  history: History = {} as any

  get container(): Container {
    return this.find(id("router")) as Container
  }

  constructor() {
    super(
      undefined,
      div(
        a(href("#"),
          onClick(() => { }),
          text("Home")
        ),
        a(href("#"),
          onClick((e: Event) => { this.container.router.history.push("/posts"); e.preventDefault() }),
          text("Posts")
        )
      ),
      routerContainer(
        id("router"),
        Home,
        PostList,
        Post
      )
    )
  }
}
