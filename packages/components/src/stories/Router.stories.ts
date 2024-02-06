import type { StoryObj, Meta } from '@storybook/html'
import {a, div, href, id, onClick, text, View} from "@nutriadoc/classes"
import {Container, container, route} from "../router"
import "reflect-metadata"
import {createBrowserHistory, History} from "history"
import RouteView from "../router/RouteView";
import RouteParameters from "../router/RouteParameters";
const history = createBrowserHistory()

history.listen((...args: any[]) => {
  console.debug(args)
})

class MainView extends View {

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
      container(
        id("router"),
        Home,
        PostList,
        Post
      )
    )
  }
}

@route("/iframe.html")
@route("/")
class Home extends RouteView {

  constructor() {
    super(
      undefined,

    )
  }
}

@route("/posts")
class PostList extends View {

  history: History = {} as any

  constructor() {
    super(
      undefined,
      div(
        a(
          href("#"),
          onClick((e: Event) => { this.history.push("/post/1"); e.preventDefault() }),
          text("Hello world")
        )
      )
    )
  }
}

@route("/post/:id")
class Post extends View {

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

interface RouterProps {

}

const meta = {
  title: 'Router',
  tags: ['autodocs'],
  render: (args) => {
    return new MainView().render() as Node
  }
} satisfies Meta<RouterProps>;

export default meta;
type Story = StoryObj<RouterProps>;

export const Primary: Story = {
  args: {
  },
}