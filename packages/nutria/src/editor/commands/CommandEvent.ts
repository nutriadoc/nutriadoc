import Command from "./Command.ts";

export default class CommandEvent extends Event {

  protected _command: Command

  public constructor(command: Command) {
    super("command")
    this._command = command
  }

  public get command(): Command {
    return this._command
  }
}