import InteractiveView from "../../../InteractiveView.ts";

export default class ActivationView extends InteractiveView {

  protected activatedBackgroundColor?: string

  protected _isActivated: boolean = false

  public constructor(element: HTMLElement, activatedBackgroundColor?: string, isLeftBorderRadius?: boolean) {
    super(element)

    // if (activatedBackgroundColor !== undefined)
    //   element.setAttribute("data-activation-color", activatedBackgroundColor)

    // this.activatedBackgroundColor = activatedBackgroundColor

    // if (!!activatedBackgroundColor)
    this.setupEvents()

    this.setupBorderRadius(isLeftBorderRadius)
  }

  protected setupEvents() {
    this.element.addEventListener("mouseenter", this.onMouseEnter.bind(this))
    this.element.addEventListener("mouseleave", this.onMouseLeave.bind(this))
  }

  protected setupBorderRadius(isLeftBorderRadius: boolean | undefined = undefined) {

    if (isLeftBorderRadius === undefined) return

    if (isLeftBorderRadius) {
      this.element.style.borderTopLeftRadius = "5px"
      this.element.style.borderBottomLeftRadius = "5px"
    } else {
      this.element.style.borderTopRightRadius = "5px"
      this.element.style.borderBottomRightRadius = "5px"
    }
  }

  protected onMouseEnter() {
    // if (!this.activatedBackgroundColor)
    //   return
    // this.element.style.backgroundColor = this.activatedBackgroundColor ??
    this.element.classList.add("active")
  }

  protected onMouseLeave() {
    // if (!this.activatedBackgroundColor)
    //   return

    if (this._isActivated)
      return

    this.element.classList.remove("active")
    // this.element.style.backgroundColor = ""
  }

  public get isActivated() {
    return this._isActivated
  }

  public active() {
    this.element.classList.add("active")
  }

  public deactivate() {
    this.element.classList.remove("active")
  }

}