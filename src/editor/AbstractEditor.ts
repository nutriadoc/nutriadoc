import View from "../ui/View.ts";
import DocumentMutation from "./DocumentMutation.ts";
import DocumentMutationEvent from "../document/events/DocumentMutationEvent.ts";
import ReadonlyPlugin from "./plugins/readonly/ReadonlyPlugin.ts";

export default abstract class AbstractEditor extends View {

  protected constructor() {
    super()
  }

  protected get plugins(): any[] {
    return [
      ReadonlyPlugin,
    ]
  }

  protected abstract get editorContent(): HTMLDivElement

  protected setupPlugins(): void {
    this.plugins.forEach(
      plugin => new plugin({
        editorContent: this.editorContent,
        editor: this,
      })
    )
  }

  protected onTextChange(mutation: DocumentMutation, old: DocumentMutation): void {
    this.dispatchEvent(new DocumentMutationEvent(mutation, old))
  }
}