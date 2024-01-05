import View from "../ui/View.ts";
import DocumentMutation from "./DocumentMutation.ts";
import DocumentMutationEvent from "../events/DocumentMutationEvent.ts";

export default abstract class AbstractEditor extends View {

  protected constructor() {
    super()
  }

  protected onTextChange(mutation: DocumentMutation, old: DocumentMutation): void {
    this.dispatchEvent(new DocumentMutationEvent(mutation, old))
  }
}