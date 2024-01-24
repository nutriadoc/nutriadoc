import Task from "../../ui/task/Task.ts";
import Option from "../../editor/Option.ts";
import Editor from "../../editor/Editor.ts";
import Document from "../Document.ts";

export default class EditorLoadContentTask extends Task {

  protected option?: Option

  protected editor: Editor

  protected document: Document

  constructor(editor: Editor, doc: Document, option?: Option) {
    super()
    this.editor = editor
    this.option = option
    this.document = doc
  }

  protected async run(): Promise<void> {

    this.loadFromInnerHtml()
    this.loadFromHtml()

    return Promise.resolve()
  }

  protected loadFromInnerHtml() {

    if (!!this.option?.delta)
      return

    if (!!this.option?.html)
      return

    const innerHTML = this.option?.containerHTML
    if (!innerHTML) {
      return
    }

    // console.debug('set inner html', innerHTML)
    if (this.editor.isEmpty)
      this.editor.setHtml(innerHTML)
  }

  protected loadFromHtml() {
    if (!!this.option?.delta)
      return

    if (!this.option?.html)
      return

    // console.debug('set html', this.option.html)

    if (this.editor.isEmpty)
      this.editor.setHtml(this.option.html)
  }
}