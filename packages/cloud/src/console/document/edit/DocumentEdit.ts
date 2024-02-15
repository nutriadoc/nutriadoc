import {back, Input, route, RouteView} from "@nutriadoc/components"
import {_for, a, bind, className, div, href, id, label, name, on, placeholder, text } from "@nutriadoc/classes"
import { create, DocumentMutationEvent } from "nutria"

import "@nutriadoc/classes/dist/style.css"
import "../../index.scss"

interface DocumentState {
  id: string

  title: string

  key: string
}

@route("/console/document/new")
export default class DocumentEdit extends RouteView {

  state: DocumentState

  protected titleChangeHandler = this.onTitleChange.bind(this)

  protected titleBlurHandler = this.onTitleBlur.bind(this)

  protected keyChangeHandler = this.onKeyChange.bind(this)

  protected keyBlurHandler = this.onKeyBlur.bind(this)

  constructor() {
    super()

    this.state = bind({
      id: "",
      title: "",
      key: ""
    })
  }

  render(): Node | Node[] {

    this.assignUnits(
      className("flex", "flex-col", "flex-1"),
      a(href("#"), text("back"), back(this)),
      div(text("New document")),
      div(
        className("flex", "flex-1", "flex-col"),
        div(
          id("title-field"),
          className("flex", "flex-col"),
          label(_for("title"), text("Title")),
          new Input(
            id("title"),
            name("title"),
            className("input", "flex"),
            placeholder("Please enter the title"),
            on("change", this.titleChangeHandler),
            on("blur", this.titleBlurHandler)
          )
        ),
        div(
          id("key-field"),
          className("flex", "flex-col"),
          label(_for("key"), text("Key")),
          new Input(
            id("key"),
            name("key"),
            className("input", "flex"),
            placeholder("Please enter the key"),
            on("change", this.keyChangeHandler),
            on("blur", this.keyBlurHandler),
          )
        ),
        div(
          id("content-field"),
          create(
            undefined,
              {
              textChange: this.onTextChange.bind(this)
            }
          ),
        )
      )
    )
    return super.render();
  }

  onTitleChange(event: Event) {
    this.state.title = (event.target as HTMLInputElement).value
    this.onModelChanged()
  }

  onTitleBlur(_: Event) {
  }

  onKeyChange(event: Event) {
    this.state.key = (event.target as HTMLInputElement).value
    this.onModelChanged()
  }

  onKeyBlur(_: Event) {
  }

  onTextChange(event: DocumentMutationEvent) {
    const { mutation, old } = event
    console.debug({ mutation, old})
  }

  onModelChanged() {

  }
}