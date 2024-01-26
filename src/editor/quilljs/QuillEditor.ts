import Editor from "../Editor.ts"
import Quill, {RangeStatic, Sources, StringMap} from "quill"
import Command from "../commands/Command.ts"
import IFormatter from "../formatter/IFormatter.ts"
import Formatter from "../formatter/Formatter.ts"
import AbstractEditor from "../AbstractEditor.ts"
import Option from "../Option.ts"
import QuillModule from "./QuillModule.ts"
import Delta from "quill-delta";
import QuillDocumentMutation from "./QuillDocumentMutation.ts"
import Range from "../Range.ts";
import {Link} from "../../core";
import {a, className, href, style, target} from "../../ui/views.ts";
import QuillPatch from "./QuillPatch.ts";

QuillModule.registerModules()

export default class QuillEditor extends AbstractEditor implements Editor {

  protected _quill!: Quill

  protected _option?: Option

  protected textChangeHandler = this.onQuillTextChange.bind(this)

  protected selectionChangeHandler = this.onQuillSelectionChange.bind(this)

  protected blurHandler = this.onBlur.bind(this)

  protected focusHandler = this.onFocus.bind(this)

  constructor(option?: Option) {
    super()

    this._option = option
  }

  init(quill: Quill) {
    this._quill = quill


    this._quill.root.addEventListener('blur', this.blurHandler)
    this._quill.root.addEventListener('focus', this.focusHandler)

    this.initializeContents()
    this.setupPlugins()
  }

  onFocus() {
    this._quill.on('text-change', this.textChangeHandler)
    this._quill.on('selection-change', this.selectionChangeHandler)
  }

  onBlur() {
    this._quill.off('text-change', this.textChangeHandler)
    this._quill.off('selection-change', this.selectionChangeHandler)
  }

  get editorElement(): HTMLElement {
    return this._quill.root
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
    return new Formatter(this._quill, this)
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

  removeLink(range: Range) {

    const [blot] = this._quill.getLeaf(range.index)
    const link = blot.parent
    const index = link.offset(link.scroll)

    this._quill.formatText(index, blot.text.length, 'link', false, 'silent')
  }

  getLink(range: Range): Link | undefined {
    const [blot] = this._quill.getLeaf(range.index)
    const link = blot.parent
    if (link.statics.name !== 'Link')
      return undefined

    return {
      text: blot.text,
      url: link.formats().link,
    }
  }

  openLink(url: string): void {
    const link = this.patchLink()
    link.href = url
    link.click()
  }

  protected patchLink(): HTMLLinkElement {
    let node: HTMLLinkElement | undefined
    node = document.body.querySelector(".link-patch") as HTMLLinkElement ?? undefined
    if (node) return node as HTMLLinkElement

    const link = a(
      href("patch"),
      target("_blank"),
      className("link-patch"),
      style({
        visibility: "hidden"
      })
    )
    node = link.render() as HTMLLinkElement
    document.body.append(node)

    return node
  }

  changeLink(range: Range, link: Link) {
    const [blot] = this._quill.getLeaf(range.index)
    const linkBlot = blot.parent
    const index = linkBlot.offset(linkBlot.scroll)

    this.quill.focus()
    this.quill.deleteText(index, blot.text.length, "user")
    this.quill.insertText(index, link.text, "user")
    this.quill.formatText(index, link.text.length + 1, "link", link.url, "user")
  }

  insertLink(range: Range, link: Link) {
    this.quill.insertText(range.index, link.text, { "link": link.url }, "user")
  }

  insertEmbed(index: number, format: string, value: any): void
  insertEmbed(index: number, command: Command): void
  insertEmbed(index: number, command: Command | string, value?: any): void {

    const format = typeof command === 'string' ? command : command.getFormat()
    value = typeof command === 'string' ? value : command.value

    this._quill.insertEmbed(index, format, value)
  }

  insertText(index: number, text: string, formats?: any, value?: any): any {
    let delta: any
    if (formats === undefined) {
      delta = this._quill.insertText(index, text)
    }
    if (value === undefined) {
      let map: StringMap = {}
      Object.keys(formats).reduce((result, key) => {
        result[key] = formats[key]
        return result
      }, map)

      delta = this._quill.insertText(index, text, map)
    } else {
      delta = this._quill.insertText(index, text, formats, value)
    }

    return delta

  }

  formatText(index: number, length: number, format: any): any
  formatText(index: number, length: number, format: string, value: any): any
  formatText(index: number, length: number, format: string | any, value?: any): any  {
    return this._quill.formatText(index, length, format, value)
  }

  removeFormat(index: number, length: number): void {
    this._quill.removeFormat(index, length)
  }

  setSelection(range: Range): void
  setSelection(index: number, length: number): void
  setSelection(index: number | Range, length?: number): void {

    if (typeof index === 'number')
      this._quill.setSelection(index as number, length as number)
    else
      this._quill.setSelection(index as RangeStatic)
  }

  focus(): void {
    this._quill.focus()
  }

  protected onQuillTextChange(delta: Delta, oldContents: Delta, _: Sources): void {
    // console.debug("on text change", delta.ops)

    // TODO: QuillPatch.patch(this._quill, delta)

    const lastChild = this._quill.root.lastChild
    if (lastChild?.textContent != "") {
      this._quill.insertText(this._quill.getLength(), "\n", "silent")
    }
    this.onTextChange(
      new QuillDocumentMutation(delta),
      new QuillDocumentMutation(oldContents)
    )
  }

  protected onQuillSelectionChange(range: RangeStatic, old: RangeStatic): void {
    this.onSelectionChange({...range}, {...old})
  }

  get isEmpty(): boolean {
    const delta = this._quill.getContents()
    const trim = delta.filter(d => typeof d.insert === 'string' ? d.insert.trim() != "" : false)
    return trim.length == 0
  }

  setHtml(html: string) {
    const delta = this._quill.clipboard.convert({html})

    if (this.isEmpty)
      this._quill.setContents(delta)
    super.setHtml(html);
  }

  set height(value: number) {
    super.height = value

    this._quill.root.parentElement!.style.height = `${value}px`
  }

  public get quill(): Quill {
    return this._quill
  }

  public set quill(quill: Quill) {
    this._quill = quill
  }

  get contents(): any {
    return this._quill.getContents()
  }
}