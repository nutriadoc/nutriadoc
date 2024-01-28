import Quill from "quill";
import Delta from "quill-delta";

export default class QuillPatch {
  static patch(quill: Quill, delta: Delta) {
    this.clearHeading(quill, delta)
  }

  static clearHeading(quill: Quill, delta: Delta) {
    const ops = delta.ops
    if (!ops.some(op => op.insert === '\n')) return

    const range = quill.getSelection()
    if (!range) return

    // quill.setSelection(range.index + 1, 0)
    console.debug(quill.getSelection(true))

    console.debug(range)
    console.debug(quill.getFormat(range))
    console.debug(quill.getContents())

    // quill.removeFormat(range.index + 1, 0)
    // quill.format('header', false, 'silent')
  }
}