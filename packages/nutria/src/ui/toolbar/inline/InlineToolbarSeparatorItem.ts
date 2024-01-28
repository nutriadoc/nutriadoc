import { View, className } from "@nutriadoc/classes"

export default class InlineToolbarSeparatorItem extends View {
  public constructor() {
    super();

    this.assignUnits(className("separator"))
  }
}