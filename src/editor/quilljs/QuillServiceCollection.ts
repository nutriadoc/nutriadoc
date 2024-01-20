import ServiceCollection from "../../document/ServiceCollection.ts";
import IFormatter from "../formatter/IFormatter.ts";
import Formatter from "../formatter/Formatter.ts";
import Quill from "quill";
import Option from "../Option.ts";
import Editor from "../Editor.ts";
import QuillEditor from "./QuillEditor.ts";
import hljs from "highlight.js";
import IView from "../../ui/IView.ts";
import InlineToolbar from "../../ui/toolbar/inline/InlineToolbar.ts";
import QuillInlineToolbar from "./QuillInlineToolbar.ts";

export default class QuillServiceCollection extends ServiceCollection {

  protected _quill!: Quill

  protected option?: Option

  constructor(option?: Option) {
    super()
    this.option = option
  }

  editor(): Editor {
    this._editor = new QuillEditor(this.option)
    const editor = this._editor as QuillEditor
    editor.init(this.quill())

    return this._editor
  }

  formatter(): IFormatter {
    return new Formatter(this._quill)
  }

  inlineToolbar(container: IView): InlineToolbar {
    return new QuillInlineToolbar(this.quill(), container, this._editor)
  }

  quill(): Quill {
    if (this._quill) return this._quill
    return this._quill = new Quill(
      this._editor.element,
      {
        modules: {
          cursors: true,
          syntax: {
            hljs: {
              highlight(language: string, text: string) {
                return hljs.highlight(text, {language})
              }
            }
          }
        },
      }
    )
  }
}