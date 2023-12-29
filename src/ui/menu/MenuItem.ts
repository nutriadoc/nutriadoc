import View from "../View.ts"
import Floating from "../floating/Floating.ts";

export default abstract class MenuItem extends View {

  protected _value: any

  protected _expand: View | undefined

  protected _expanded: boolean = false

  protected _enabled: boolean = true

  public abstract isActivated(): boolean

  public abstract deactivate(): void

  public abstract active(): void

  public visibleExpand() {

    if (!this.expand) return

    if (!(this.expand instanceof Floating))
      return

    const expd = this.expand as Floating
    expd.visible(this)
  }

  public hiddenExpand() {

    if (!this.expand) return

    if (!(this.expand instanceof Floating))
      return

    const expd = this.expand as Floating
    expd.hidden()
  }

  public get value(): any {
    return this._value
  }

  public set value(value: any) {
    this._value = value
  }

  public get expand(): View | undefined {
    return this._expand
  }

  public set expand(value: View | undefined) {
    if (this._expanded) return
    if (!value) return


    this._expand = value
    this._expanded = true

    value.addEventListener("leave", this.onExpandViewLeave.bind(this))
  }

  protected onExpandViewLeave() {
    if (!(this._expand instanceof Floating))
      return

    this._expand.hidden()
  }

  protected set enabled(value: boolean) {
    this._enabled = value
  }

  protected get enabled(): boolean {
    return this._enabled
  }
}