import EditorPluginContext from "./EditorPluginContext.ts";

export default abstract class EditorPlugin {

  protected context: EditorPluginContext

  protected constructor(context: EditorPluginContext) {
    this.context = context
  }
}