import {className, div, svg, text} from "../../views.ts";
import View from "../../View.ts";
import {ChevronDown, ChevronUp} from "../../styles/icons";
import IUnit from "../../view/unit/IUnit.ts";
import MessageBoxComponent from "../MessageBoxComponent.ts";

export default class SimpleMessageBox extends View implements MessageBoxComponent {

  public constructor(...units: IUnit[]) {

    super(undefined, ...units)

    const components = div(
      className("ntr-simple-message-box", "no-select", "hidden"),
      div(
        className("title"),
        div(
          className("title-text"),
          text("Title")
        ),
        div(
          className("expand-collapse"),
          svg(ChevronUp),
          svg(ChevronDown)
        )
      )
    )

    this.addElement(components)
  }

  protected onExpandClick() {
    this.element.dispatchEvent(new Event("expand"))
  }
}