import DocumentCommand from "./DocumentCommand.ts";

export default class DocumentCommandEvent extends Event {

  protected _command: DocumentCommand

  constructor(command: DocumentCommand) {
      super("command");
      this._command = command;
  }
  get command() {
      return this._command;
  }
}