import {className, div, placeholder, style, text, type, value, View, bind} from "@nutriadoc/classes"
import {Input} from "../../input"
import {PrimaryButton} from "../../button"

interface Subscribe {
  email: string
}

export default class WantList extends View {

  model: Subscribe

  constructor() {
    const model = bind({
      email: ""
    } as Subscribe)

    super(
      undefined,
      className("flex", "flex-1", "gap-4"),
      div(
        className("flex", "flex-1"),
        new Input(
          className("flex", "flex-1"),
          placeholder("Please enter your email"),
          type("email"),
          style({
            lineHeight: "24px"
          }),
          value(model.email),
        )
      ),
      div(
        new PrimaryButton(
          {},
          className("primary-button"),
          text("Subscribe")
        )
      )
    )

    this.model = model
  }
}