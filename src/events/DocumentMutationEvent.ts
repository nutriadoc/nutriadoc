import DocumentMutation from "../editor/DocumentMutation.ts"

export default class DocumentMutationEvent extends Event {

  protected _mutation: DocumentMutation

  protected _old: DocumentMutation

  constructor(mutation: DocumentMutation, old: DocumentMutation) {
    super("mutation")
    this._mutation = mutation
    this._old = old
  }

  get mutation(): DocumentMutation {
    return this._mutation
  }

  get old(): DocumentMutation {
    return this._old
  }
}