import View from "../../ui/View.ts";
import {className, contentEditable, style} from "../../ui/views.ts";

export default class InlineContainer extends View {
  constructor() {
    super(
      undefined,
      className("inline-container"),
      contentEditable(false),
      style({
        position: "absolute",
      })
    );
  }
}