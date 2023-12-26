import Quill, {StringMap} from "quill"
import ToolbarAction from "../../ui/toolbar/main/ToolbarAction.ts"
import Format from "./Format.ts";
import Toolbar from "../../ui/toolbar/main/Toolbar.ts";

export default abstract class AbstractFormatter {

  protected quill: Quill

  public toolbarAction?: ToolbarAction

  public toolbar: Toolbar

  public constructor(quill: Quill, toolbar: Toolbar) {
    this.quill = quill
    this.toolbar = toolbar
  }

  public abstract select(formats: StringMap): void

  public abstract format(format: Format, ...params: any[]): void
}