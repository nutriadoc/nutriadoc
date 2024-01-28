import Format from "../formatter/Format.ts"
import Command from "./Command.ts"

export default class QuitFormatPainterCommand extends Command {
  constructor() {
    super(Format.FormatPainter);
  }
}