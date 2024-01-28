import { className, contentEditable, style, View } from "@nutriadoc/classes"

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