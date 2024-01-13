import EditorPlugin from "../EditorPlugin.ts"
import EditorPluginContext from "../EditorPluginContext.ts";
import QuillEditor from "../../quilljs/QuillEditor.ts";
import Delta from "quill-delta";
import {RangeStatic, Sources} from "quill";

export default class ReadonlyPlugin extends EditorPlugin {

  protected previous?: Delta

  constructor(context: EditorPluginContext) {
    super(context)


    const quill = context.editor as QuillEditor

    let deltas: Map<number, Delta> = new Map()

    const pickSurroundingDeltas  = (index: number) => {

      deltas.clear()

      deltas.set(index - 1, quill.quill.getContents(index - 1, 1))
      deltas.set(index + 1, quill.quill.getContents(index + 1, 1))
      deltas.set(index, quill.quill.getContents(index, 1))

    }

    quill.quill.on("selection-change", (range: RangeStatic | null, oldRange: RangeStatic | null, _source: Sources) => {
      if (!range) return
      const selected = quill.quill.getContents(range.index, range.length)

      if (this.hasReadonly(selected)) {
        let r = oldRange || { index: 0, length: 0 }
        quill.quill.setSelection(r)
        return
      }

      pickSurroundingDeltas(range.index)
    })

    quill.quill.on("text-change", (delta: Delta, _: Delta, _source: Sources) => {

      const range = quill.quill.getSelection(false)
      if (!range) return

      let del = delta.filter(op => op.delete != null)[0]?.delete
      let retain = delta.filter(op => op.retain != null)[0]?.retain

      if (!retain) retain = range.index
      if (typeof retain !== 'number') { return pickSurroundingDeltas(range.index) }
      if (!del) { return pickSurroundingDeltas(range.index) }


      const restore = deltas.get(retain)
      if (!restore) return pickSurroundingDeltas(range.index)


      if (!this.hasReadonly(restore)) { return pickSurroundingDeltas(range.index) }

      const op = new Delta()
        .retain(retain)
        .concat(restore)

      retain++

      quill.quill.updateContents(op)
      quill.quill.setSelection({index: retain, length: 0})

      pickSurroundingDeltas(retain)
    })
  }

  protected hasReadonly(delta: Delta): boolean {
    return delta.ops.some(op => op.attributes?.readonly)
  }


}