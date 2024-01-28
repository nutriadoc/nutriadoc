import DocumentMutation from "../DocumentMutation.ts";

export default interface UserPressBehavior {

  typing(mutation: DocumentMutation, old: DocumentMutation): void

  clickUndo(): void
}