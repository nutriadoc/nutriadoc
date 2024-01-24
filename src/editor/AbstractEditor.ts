import View from "../ui/View.ts";
import DocumentMutation from "./DocumentMutation.ts";
import DocumentMutationEvent from "../document/events/DocumentMutationEvent.ts";
import ReadonlyPlugin from "./plugins/readonly/ReadonlyPlugin.ts";
import Range from "./Range.ts";
import EditorSelectionChangeEvent from "./events/EditorSelectionChangeEvent.ts";

export default abstract class AbstractEditor extends View {

  protected _html: string = ""

  protected _height: number = 0

  protected constructor() {
    super()
  }

  protected get plugins(): any[] {
    return [
      ReadonlyPlugin,
    ]
  }

  abstract get editorContent(): HTMLDivElement

  protected setupPlugins(): void {
    this.plugins.forEach(
      plugin => new plugin({
        editor: this,
      })
    )
  }

  protected onTextChange(mutation: DocumentMutation, old: DocumentMutation): void {
    this.dispatchEvent(new DocumentMutationEvent(mutation, old))
  }

  protected onSelectionChange(range: Range, old: Range): void {
    // console.debug("onSelectionChange", { range, old})
    this.dispatchEvent(new EditorSelectionChangeEvent(range, old))
  }

  get html(): string {
    return this._html
  }

  set html(html: string) {
    this.setHtml(html)
  }

  get height(): number {
    return this._height
  }

  set height(value: number) {
    this._height = value
  }

  getHtml(): string {
    return this._html
  }

  setHtml(html: string): void {
    this._html = html
  }
}