import ActivationView from "../main/items/ActivationView.ts"
import { className, svg, IView, IUnit } from "@nutriadoc/classes"

export default class InlineToolbarItem extends ActivationView {

  protected icon?: IView

  public constructor(icon?: string, ... units: IUnit[]) {
    const element = document.createElement("div")
    super(element)

    this.assignUnits(...[className('inline-toolbar-item'), ...units])

    if (!!icon) {
      this.icon = svg(icon).assignUnits(className("svg"))
      this.addElement(this.icon)
    }
  }

}