import {
  Floating,
  Position,
  className,
  input,
  placeholder,
  div,
  label,
  text,
  name,
  _for,
  value,
  onClick,
  bind,
} from "@nutriadoc/classes"
import "../index.scss"

interface LoginModelBiding {

  email: string

  password: string

  emailNeedsValidation: boolean

  passwordNeedsValidation: boolean

  emailValidationMessage: string

  passwordValidationMessage: string
}

export default class Login extends Floating {

  protected model: LoginModelBiding

  constructor() {
    super(Position.BottomLeft,)

    const model = this.model = bind<LoginModelBiding>({
      email: "",
      password: "",
      emailNeedsValidation: false,
      passwordNeedsValidation: false,
      emailValidationMessage: "",
      passwordValidationMessage: ""
    })

    this.assignUnits(
      className("login"),
      div(
        label(text("Email"), _for("email")),
        input(
          name("email"),
          className("input"),
          placeholder("Email"),
          value(model.email)
        ),
        div(
          className("message"),
          text(model.emailValidationMessage)
        )
      ),
      div(
        label(text("Password"), _for("email")),
        input(
          name("email"),
          className("input"),
          placeholder("Email"),
          value(model.password)
        ),
        div(
          className("message"),
          text(model.passwordValidationMessage)
        )
      ),
      div(
        className("actions"),
        div(
          className("button"),
          text("Login"),
          onClick(() => { this.onLogin() })
        )
      )
    )
  }

  protected validate(): boolean {
    return true
  }

  protected onLogin() {
    if (!this.validate()) {
      return
    }

    this.hidden()
  }
}