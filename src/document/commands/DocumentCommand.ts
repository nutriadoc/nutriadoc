import DocumentCommandType from "./DocumentCommandType.ts";

export default abstract class DocumentCommand {

  protected _type: DocumentCommandType

  protected constructor(type: DocumentCommandType) {
    this._type = type
  }

  get type(): DocumentCommandType {
    return this._type
  }
}