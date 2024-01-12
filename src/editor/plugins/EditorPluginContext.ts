import Editor from "../Editor.ts";

export default interface EditorPluginContext {

  editorContent: HTMLDivElement

  editor: Editor
}