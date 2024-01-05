import UserPressBehavior from "./UserPressBehavior.ts";
import DocumentMutation from "../DocumentMutation.ts";
import Toolbars from "../../ui/toolbar/main/Toolbars.ts";

export default class DefaultUserPressBehavior implements UserPressBehavior {

  protected toolbars: Toolbars

  constructor(toolbars: Toolbars) {
    this.toolbars = toolbars
  }

  typing(_: DocumentMutation, __: DocumentMutation) {
    this.toolbars.enableToolbarItem("undo")
  }

  clickUndo() {
    this.toolbars.enableToolbarItem("redo")
  }

}