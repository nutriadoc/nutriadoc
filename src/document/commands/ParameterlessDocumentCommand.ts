import DocumentCommand from "./DocumentCommand.ts";
import DocumentCommandType from "./DocumentCommandType.ts";

export default class ParameterlessDocumentCommand extends DocumentCommand {
  public constructor(type: DocumentCommandType) {
    super(type)
  }
}