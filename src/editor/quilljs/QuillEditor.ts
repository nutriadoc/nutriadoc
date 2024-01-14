import Editor from "../Editor.ts"
import Quill, {Sources, StringMap} from "quill"
import Command from "../commands/Command.ts"
import IFormatter from "../formatter/IFormatter.ts"
import Formatter from "../formatter/Formatter.ts"
import AbstractEditor from "../AbstractEditor.ts"
import Option from "../Option.ts"
import QuillModule from "./QuillModule.ts"
import Delta from "quill-delta";
import QuillDocumentMutation from "./QuillDocumentMutation.ts"
import Range from "../Range.ts";
import hljs from 'highlight.js'

QuillModule.registerModules()

import 'quill/dist/quill.core.css'
import 'highlight.js/styles/github.css'

export default class QuillEditor extends AbstractEditor implements Editor {

  protected _quill: Quill

  protected _option?: Option

  protected textChangeHandler: any

  constructor(option?: Option) {
    super()

    this._quill = new Quill(
      this.element,
      {
        modules: {
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

    this._option = option
    this.initializeContents()
    this.setupPlugins()

    this.textChangeHandler = this.onQuillTextChange.bind(this)
    this._quill.on('text-change', this.textChangeHandler)
  }

  protected initializeContents() {
    const contents = this._quill.clipboard.convert({html: this._option?.html})
    this._quill.setContents(contents)
    this._quill.history.clear()
  }

  get editorContent(): HTMLDivElement {
    return this._quill.root
  }

  createFormatter(): IFormatter {
    return new Formatter(this._quill)
  }

  getSelection(): Range {
    const range = this._quill.getSelection()
    return {
      index: range?.index ?? -1,
      length: range?.length ?? -1
    } as Range
  }

  getLength(): number {
    return this._quill.getLength()
  }

  getHtml(): string {
    return this._quill.root.innerHTML
  }

  insertEmbed(index: number, format: string, value: any): void
  insertEmbed(index: number, command: Command): void
  insertEmbed(index: number, command: Command | string, value?: any): void {

    const format = typeof command === 'string' ? command : command.getFormat()
    value = typeof command === 'string' ? value : command.value

    this._quill.insertEmbed(index, format, value)
  }

  insertText(index: number, text: string, formats?: any, value?: any): void {
    if (formats === undefined) {
      this._quill.insertText(index, text)
      return
    }
    if (value === undefined) {
      let map: StringMap = {}
      Object.keys(formats).reduce((result, key) => {
        result[key] = formats[key]
        return result
      }, map)

      this._quill.insertText(index, text, map)
    } else {
      this._quill.insertText(index, text, formats, value)
    }

  }

  formatText(index: number, length: number, format: any): void
  formatText(index: number, length: number, format: string, value: any): void
  formatText(index: number, length: number, format: string | any, value?: any): void  {
    this._quill.formatText(index, length, format, value)
  }

  removeFormat(index: number, length: number): void {
    this._quill.removeFormat(index, length)
  }

  setSelection(index: number, length: number): void {
    this._quill.setSelection(index, length)
  }

  focus(): void {
    this._quill.focus()
  }

  protected onQuillTextChange(delta: Delta, oldContents: Delta, _: Sources): void {
    this.onTextChange(
      new QuillDocumentMutation(delta),
      new QuillDocumentMutation(oldContents)
    )
  }

  setHtml(html: string) {
    const delta = this._quill.clipboard.convert({html})
    this._quill.updateContents(delta)
    super.setHtml(html);
  }

  public get quill(): Quill {
    return this._quill
  }
}