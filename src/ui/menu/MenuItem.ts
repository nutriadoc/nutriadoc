import View from "../View.ts"

export default abstract class MenuItem extends View {

  public abstract isActivated(): boolean

  public abstract deactivate(): void

  public abstract active(): void
}