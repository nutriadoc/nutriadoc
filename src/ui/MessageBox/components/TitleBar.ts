import View from "../../View.ts";
import {className, div, svg, text} from "../../views.ts"
import {ChevronDown, ChevronUp} from "../../styles/icons"
import i18n from "../../../i18n";

export default class TitleBar extends View {
  public constructor() {
    super(
      undefined,
      className("title-bar"),
      div(
        className("title-text"),
        text(TitleBar.title()),
      ),
      div(
        className("expand-collapse"),
        svg(ChevronUp),
        svg(ChevronDown)
      )
    )
  }

  static title(): string {
    return i18n.t("notification.title")
  }
}