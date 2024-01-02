import ActivationView from "../main/items/ActivationView.ts"
import {className, svg} from "../../views.ts";
import IView from "../../IView.ts"
import IUnit from "../../view/unit/IUnit.ts";

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