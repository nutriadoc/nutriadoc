import View from "../../View.ts"
import {className} from "../../views.ts";

export default class InlineToolbarSeparatorItem extends View {
  public constructor() {
    super();

    this.assignUnits(className("separator"))
  }
}