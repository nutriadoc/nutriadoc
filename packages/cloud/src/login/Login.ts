import {
  FloatingView,
  Position,
  className,
  placeholder,
  div,
  label,
  text,
  name,
  _for,
  value,
  onClick,
  bind,
  onChange,
  type,
  on, id, style,
} from "@nutriadoc/classes"
import {Input, PrimaryButton} from "@nutriadoc/components"
import {UserService, DefaultUserService} from "@nutriadoc/service"
import {ApiServer} from "../config/Server.ts"

import "../index.scss"


interface LoginModelBiding {

  email: string

  password: string

  emailNeedsValidation: boolean

  passwordNeedsValidation: boolean

  emailValidationMessage: string

  passwordValidationMessage: string
}

export default class Login extends FloatingView {

  protected model: LoginModelBiding

  protected emailBlurHandler = this.onEmailBlur.bind(this)

  protected emailChangeHandler = this.onEmailChange.bind(this)

  protected passwordBlurHandler = this.onPasswordBlur.bind(this)

  protected passwordChangeHandler = this.onPasswordChange.bind(this)

  protected loginHandler = this.onLogin.bind(this)

  protected service: UserService = new DefaultUserService(ApiServer)

  constructor() {
    super(Position.BottomLeft)

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
      style({
        padding: '20px'
      }),
      div(
        id("email-field"),
        className("flex", "flex-col"),
        label(
          className("label"),
          text("Email"),
          _for("email")
        ),
        new Input(
          id("email"),
          name("email"),
          className("input", "flex", "flex-1"),
          placeholder("Please enter your email"),
          value(model.email),
          onChange(this.emailChangeHandler),
          on('blur', this.emailBlurHandler),
        ),
        div(
          className("form-text"),
          text(model.emailValidationMessage)
        )
      ),
      div(
        className("flex", "flex-col"),
        label(
          text("Password"),
          _for("password"),
          className("label"),
        ),
        new Input(
          name("password"),
          className("input", "flex", "flex-1"),
          type("password"),
          placeholder("Please enter your password"),
          value(model.password),
          onChange(this.passwordChangeHandler),
          on('blur', this.passwordBlurHandler),
        ),
        div(
          className("form-text"),
          text(model.passwordValidationMessage)
        )
      ),
      div(
        className("actions"),
        new PrimaryButton(
          {
            loading: false,
          },
          text("Login"),
          onClick(this.loginHandler)
        ),
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
    const input = this.find(id("email-field"))?.find("email")

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

  protected async onLogin(): Promise<void> {

    // TODO: fix this find
    const primaryButton = this.findAll(className("actions"))[0]?.children[0] as PrimaryButton
    primaryButton.isLoading = true


    if (!this.validateTheEmail() || !this.validateThePassword()) return false

    const email = this.model.email.toString()
    const password = this.model.password.toString()

    try {
      this.service.login(email, password)
    } catch (e) {

    }

    primaryButton.isLoading = false

    // this.hidden()
  }
}

