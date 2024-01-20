import Range from "../Range.ts";

export default class EditorSelectionChangeEvent extends Event {

  range: Range

  old: Range

  constructor(range: Range, old: Range) {
    super("selection-change")

    this.range = range
    this.old = old
  }


}