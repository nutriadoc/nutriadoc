import {className, div, on, span, svg, text} from "../../views.ts";
import {ChevronDown} from "../../styles/icons";
import IUnit from "../../view/unit/IUnit.ts";
import MessageBoxComponent from "../MessageBoxComponent.ts";
import FlexView from "../../FlexView.ts";

export default class TinyMessageBox extends FlexView implements MessageBoxComponent {

  public constructor(...units: IUnit[]) {

    super(undefined, ...units)

    const components = div(
      className("ntr-tiny-message-box", "no-select", "hidden"),
      div(
        className("number"),
        span(
          className("text"),
          text("10")
        )
      ),
      div(
        className("expand"),
        svg(ChevronDown),
        on("click", this.onExpandClick.bind(this))
      )

    )

    this.addElement(components)
  }

  protected onExpandClick() {
    this.element.dispatchEvent(new Event("expand"))
  }
}