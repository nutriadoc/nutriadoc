import ServiceCollection from "../../document/ServiceCollection.ts";
import IFormatter from "../formatter/IFormatter.ts";
import Formatter from "../formatter/Formatter.ts";
import Quill from "quill";
import Option from "../Option.ts";
import Editor from "../Editor.ts";
import QuillEditor from "./QuillEditor.ts";
import { IView } from "@nutriadoc/classes";
import InlineToolbar from "../../ui/toolbar/inline/InlineToolbar.ts";
import QuillInlineToolbar from "./QuillInlineToolbar.ts";
import Collaboration from "../collaboration/Collaboration.ts";
import WebsocketCollaboration from "../collaboration/WebSocketCollaboration.ts";
import {getCollaborationOption} from "../collaboration/CollaborationOption.ts";
import QuillDocument from "./QuillDocument.ts";
import Document from "../../document/Document.ts";
// import hljs from "highlight.js";

export default class QuillServiceCollection extends ServiceCollection {

  protected _quill!: Quill

  protected option?: Option

  protected _formatter!: IFormatter

  constructor(option?: Option) {
    super()
    this.option = option
  }

  editor(): Editor {
    if (!!this._editor) return this._editor

    this._editor = new QuillEditor(this.option)

    return this._editor
  }

  formatter(): IFormatter {
    if (this._formatter) return this._formatter
    this._formatter = new Formatter(this.quill(), this.editor())
    return this._formatter
  }

  collaboration(doc: Document): Collaboration {
    return new WebsocketCollaboration(
      doc as QuillDocument,
      getCollaborationOption(this.option?.collaboration),
    )
  }

  inlineToolbar(container: IView): InlineToolbar {
    return new QuillInlineToolbar(this.quill(), container, this._editor)
  }

  quill(): Quill {
    if (this._quill) return this._quill

    this._quill = new Quill(
      this.editor().element,
      {
        modules: {
          keyboard: {
            bindings: {
              // TODO:
/*              'header enter': {
                key: 'Enter',
                handler: (range: RangeStatic, context: any) => {
                  // this._quill.insertText(range.index + 1, '\n', Quill.sources.SILENT)
                  const delta = new Delta()
                    .retain(range.index + 1 )
                    .insert('\n', { header: false})
                  console.debug('handler', {context, delta})

                  this._quill.updateContents(delta)
                  this._quill.setSelection(range.index + 1, 0, Quill.sources.SILENT)
                }
              }*/
            },
          },
          cursors: true,
          syntax: {
            hljs: {
              highlight(language: string, text: string) {
                // @ts-ignore
                return window.hljs?.highlight(text, {language})
              }
            }
          },
          uploader: {
            // mimetypes: {
            //   includes(type: string) {
            //     debugger
            //   }
            // },
            // handler(range, files) {
            //   debugger
            // }
          }
        },
      }
    )
    const editor = this._editor as QuillEditor
    editor.init(this._quill)

    return this._quill
  }
}