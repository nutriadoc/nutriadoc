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
import Service from "./Service.ts";

interface Subscribe {

  email: string

  errorMessage: string
}

export default class WantList extends View {

  model: Subscribe

  service: Service = new Service()

  constructor() {
    const model: Subscribe = bind({
      email: "cj@iuantu.com",
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
        id("action"),
        new PrimaryButton(
          {},
          id("add"),
          className("primary-button"),
          text("Subscribe"),
          onClick(() => this.onSubscribe())
        )
      )
    )

    this.model = model
  }

  protected get fieldMessage() {
    return this.find(id("email-field"))?.find(id("fieldMessage")) as FieldMessage
  }

  validate() {
    const email = this.find(id("email-field"))?.find(id("email"))

    if (!Rules.email(this.model.email.toString())) {
      this.model.errorMessage = "Please enter your email"
      email?.addClass('validation-faild')
      this.fieldMessage.level = FieldMessageLevel.Error

      return false
    } else {
      this.model.errorMessage = "Your email is valid!"
      email?.removeClass('validation-faild')
      this.fieldMessage.level = FieldMessageLevel.Success

      return true
    }
  }

  async onSubscribe() {
    if (!this.validate()) {
      return
    }

    const button = this.find(id("action"))?.find(id("add")) as PrimaryButton
    if (button.isLoading) return

    button.isLoading = true

    try {
      await this.service.add(this.model.email.toString())
      this.fieldMessage.level = FieldMessageLevel.Success
      this.model.errorMessage = "Email added to want list!"
    } catch (e) {
      this.model.errorMessage = "Failed to add email to want list, the email is already added?"
      this.fieldMessage.level = FieldMessageLevel.Error
    }

    button.isLoading = false
  }
}