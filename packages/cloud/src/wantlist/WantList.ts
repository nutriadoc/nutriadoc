import {
  bind,
  className,
  div,
  id,
  on,
  onChange,
  onClick,
  placeholder,
  Rules,
  style,
  text,
  type,
  value,
  View
} from "@nutriadoc/classes"
import {FieldMessage, FieldMessageLevel, Input, PrimaryButton} from "@nutriadoc/components"

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
        className("flex", "flex-col", "flex-1", "gap-2"),
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
        new FieldMessage(
          FieldMessageLevel.Info,
          id("fieldMessage"),
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
    const fieldMessage = this.find(id("email-field"))?.find(id("fieldMessage")) as FieldMessage

    if (!Rules.email(this.model.email)) {
      this.model.errorMessage = "Please enter your email"
      email?.addClass('validation-faild')
      fieldMessage.level = FieldMessageLevel.Error

      return false
    } else {
      this.model.errorMessage = "Your email is valid!"
      email?.removeClass('validation-faild')
      fieldMessage.level = FieldMessageLevel.Success

      return true
    }
  }

  onSubscribe() {

  }
}