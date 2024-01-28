import {ChevronDown} from "../../styles/icons"
import MessageBoxComponent from "../MessageBoxComponent.ts"
import { FlexView, className, div, on, span, svg, text, IUnit } from "@nutriadoc/classes"

export default class DetailMessageBox extends FlexView implements MessageBoxComponent {

  public constructor(...units: IUnit[]) {

    super(undefined, ...units)

    const components = div(
      className("ntr-detail-message-box", "no-select", "hidden"),
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