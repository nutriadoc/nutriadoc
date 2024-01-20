import InlineToolbar from "../ui/toolbar/inline/InlineToolbar.ts";
import Toolbar from "../ui/toolbar/main/Toolbar.ts";
import IFormatter from "../editor/formatter/IFormatter.ts";
import Editor from "../editor/Editor.ts";
import IView from "../ui/IView.ts";

export default class ServiceCollection {

  protected _editor!: Editor

  mainToolbar(): Toolbar {
    return Toolbar.simple(this.formatter())
  }

  inlineToolbar(container: IView): InlineToolbar {
    return new InlineToolbar(container, this._editor)
  }

  editor(): Editor {
    throw new Error("Method not implemented.")
  }

  formatter(): IFormatter {
    throw new Error("Method not implemented.")
  }
}