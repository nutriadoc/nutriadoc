import DocumentMutation from "../DocumentMutation.ts"
import Delta from "quill-delta";

export default class QuillDocumentMutation implements DocumentMutation {

  protected _delta: Delta

  constructor(delta: Delta) {
    this._delta = delta
  }

  public get delta(): Delta {
    return this._delta
  }
}