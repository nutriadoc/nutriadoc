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
  bind, onChange, type, on,
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

  protected emailBlurHandler = this.onEmailBlur.bind(this)

  protected emailChangeHandler = this.onEmailChange.bind(this)

  protected passwordBlurHandler = this.onPasswordBlur.bind(this)

  protected passwordChangeHandler = this.onPasswordChange.bind(this)

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
          placeholder("Please enter your email"),
          value(model.email),
          onChange(this.emailChangeHandler),
          on('blur', this.emailBlurHandler),
        ),
        div(
          className("message"),
          text(model.emailValidationMessage)
        )
      ),
      div(
        label(text("Password"), _for("password")),
        input(
          name("password"),
          className("input"),
          type("password"),
          placeholder("Please enter your password"),
          value(model.password),
          onChange(this.passwordChangeHandler),
          on('blur', this.passwordBlurHandler),
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

  protected onEmailBlur() {
    this.validateTheEmail()
  }

  protected onEmailChange(e: Event) {
    this.model.email = (e.target as HTMLInputElement).value
  }

  protected onPasswordBlur() {
    this.validateThePassword()
  }

  protected onPasswordChange(e: Event) {
    this.model.password = (e.target as HTMLInputElement).value
  }

  protected validateTheEmail() {
    if (this.model.email == "" || this.model.email.indexOf("@") == -1) {
      this.model.emailValidationMessage = "Please enter your email, it is required"
      return false
    } else {
      this.model.emailValidationMessage = ""
      return true
    }
  }

  protected validateThePassword() {
    if (this.model.password == "" || this.model.password.length < 3) {
      this.model.passwordValidationMessage = "Please enter your password, it is required"
      return false
    } else {
      this.model.passwordValidationMessage = ""
      return true
    }
  }

  protected onLogin() {
    if (!this.validateTheEmail() || !this.validateThePassword()) return false

    this.hidden()
  }
}