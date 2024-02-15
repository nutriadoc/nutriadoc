import DocumentMutationEvent from "@/document/events/DocumentMutationEvent.ts";

export interface TextChangeHandler {
  (event: DocumentMutationEvent): void
}