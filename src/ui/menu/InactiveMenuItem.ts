import MenuItem from "./MenuItem.ts";

export default class InactiveMenuItem extends MenuItem {
  public constructor(key?: string) {
    const element = document.createElement("div")
    super(element);

    this.key = key ?? ""
  }

  public isActivated(): boolean {
    return false
  }

  public deactivate(): void {
  }

  public active(): void {
  }
}