import Command from "./Command.ts";
import Format from "../formatter/Format.ts";

export default class FormatPainterCommand extends Command {

  protected _limitOnce: boolean = true

  public constructor(limitOnce: boolean = true) {
    super(Format.FormatPainter)
    this._limitOnce = limitOnce
  }

  public get limitOnce(): boolean {
    return this._limitOnce
  }
}