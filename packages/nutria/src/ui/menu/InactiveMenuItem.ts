import MenuItem from "./MenuItem.ts";
import IUnit from "../../../../classes/src/ui/view/unit/IUnit.ts";

export default class InactiveMenuItem extends MenuItem {
  public constructor(key?: string, ...units: IUnit[]) {
    const element = document.createElement("div")
    super(element, ...units)

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