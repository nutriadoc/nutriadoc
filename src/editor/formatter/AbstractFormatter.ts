import Quill, {StringMap} from "quill"
import ToolbarAction from "../../ui/toolbar/main/ToolbarAction.ts"
import Format from "./Format.ts";

export default abstract class AbstractFormatter {
  protected quill: Quill

  public toolbarAction?: ToolbarAction

  public constructor(quill: Quill) {
    this.quill = quill
  }

  public abstract select(formats: StringMap): void

  public abstract format(format: Format, ...params: any[]): void
}