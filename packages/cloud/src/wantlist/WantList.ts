import {
  className,
  div,
  placeholder,
  style,
  text,
  type,
  value,
  View,
  bind,
  on,
  onClick,
  onChange, id,
  Rules
} from "@nutriadoc/classes"
import { Input, PrimaryButton } from "@nutriadoc/components"

import "@nutriadoc/components/dist/style.css"

interface Subscribe {

  email: string

  errorMessage: string
}

export default class WantList extends View {

  model: Subscribe

  constructor() {
    const model: Subscribe = bind({
      email: "",
      errorMessage: ""
    })

    super(
      undefined,
      id("wantlist"),
      className("flex", "flex-1", "gap-4"),
      div(
        id("email-field"),
        className("flex", "flex-col", "flex-1"),
        new Input(
          id("email"),
          className("flex", "flex-1"),
          placeholder("Please enter your email"),
          type("email"),
          style({
            lineHeight: "24px"
          }),
          value(model.email),
          onChange((e: Event) => {
            const target = e.target as HTMLInputElement
            model.email = target.value
            this.validate()
          }),
          on('blur', () => this.validate())
        ),
        div(
          className("error-message"),
          text(model.errorMessage)
        )
      ),
      div(
        new PrimaryButton(
          {},
          className("primary-button"),
          text("Subscribe"),
          onClick(() => this.onSubscribe())
        )
      )
    )

    this.model = model
  }

  validate() {
    const email = this.find(id("email-field"))?.find(id("email"))

    if (!Rules.email(this.model.email)) {
      this.model.errorMessage = "Please enter your email"
      email?.addClass('validation-faild')
    } else {
      this.model.errorMessage = ""
      email?.removeClass('validation-faild')
    }
  }

  onSubscribe() {

  }
}