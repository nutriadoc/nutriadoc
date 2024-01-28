import Command from "./Command.ts";
import Format from "../formatter/Format.ts";

export default class ParameterlessCommand extends Command {

  public constructor(format: Format) {
    super(format)

    this._value = null
  }
}