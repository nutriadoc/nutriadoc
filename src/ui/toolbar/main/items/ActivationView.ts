import InteractiveView from "../../../InteractiveView.ts";

export default class ActivationView extends InteractiveView {

  protected _isActivated: boolean = false

  public constructor(element?: HTMLElement, _activatedBackgroundColor?: string, isLeftBorderRadius?: boolean) {
    super(element)
    this.setupEvents()

    this.setupBorderRadius(isLeftBorderRadius)
  }

  protected setupEvents() {
    this.element.addEventListener("mouseenter", this.onMouseEnter.bind(this))
    this.element.addEventListener("mouseleave", this.onMouseLeave.bind(this))
  }

  protected setupBorderRadius(isLeftBorderRadius: boolean | undefined = undefined) {

    if (isLeftBorderRadius === undefined) {
      this.element.style.borderRadius = "5px"
      return
    }

    if (isLeftBorderRadius) {
      this.element.style.borderTopLeftRadius = "5px"
      this.element.style.borderBottomLeftRadius = "5px"
    } else {
      this.element.style.borderTopRightRadius = "5px"
      this.element.style.borderBottomRightRadius = "5px"
    }
  }

  protected onMouseEnter() {
    this.element.classList.add("active")
  }

  protected onMouseLeave() {
    if (this._isActivated)
      return

    this.element.classList.remove("active")
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