import DocumentCommandType from "./DocumentCommandType.ts";
import DocumentMutation from "../../editor/DocumentMutation.ts";
import DocumentCommand from "./DocumentCommand.ts";

export default class TypingCommand extends DocumentCommand {

  protected _mutation: DocumentMutation

  protected _old: DocumentMutation

  constructor(mutation: DocumentMutation, old: DocumentMutation) {
    super(DocumentCommandType.Typing)
    this._mutation = mutation
    this._old = old
  }

  get mutation() {
    return this._mutation;
  }

  get old() {
    return this._old;
  }
}