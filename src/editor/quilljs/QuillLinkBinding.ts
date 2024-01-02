import LinkBinding from "../../ui/link/LinkBinding.ts";
import Quill, {RangeStatic, Sources, StringMap} from "quill";
import {a, className, href, style, target} from "../../ui/views.ts";
import ILinkBinding from "../../ui/link/ILinkBinding.ts";
import LinkEvent from "../../ui/toolbar/inline/link/LinkEvent.ts";


export default class QuillLinkBinding extends LinkBinding {

  protected quill: Quill

  protected range?: RangeStatic

  protected leaf?: any

  protected linkBlot?: any

  protected format?: StringMap

  protected linkBlotIndex?: number

  constructor(quill: Quill, range?: RangeStatic, leaf?: any) {
    super()

    this.range = range
    this.leaf = leaf
    this.quill = quill

    this.linkBlot = leaf?.parent
    this.linkBlotIndex = this.linkBlot.offset(this.quill.scroll)

    this.loadUrlAndText()
  }

  protected onLinkSettingsHide() {
    if (!this.settings) return
    super.onLinkSettingsHide()
    this.restoreCursor("user")
  }

  protected onLinkSettingsChange(event: Event) {
    const e = event as LinkEvent
    this.insertOrChangeLink(e.url, e.text)
    super.onLinkSettingsChange(event)
  }

  protected insertOrChangeLink(url: string, text: string) {

    const cursor = this.range
    if (!cursor) return

    if (!this.leaf)
      this.insertLink(cursor, text, url)
    else {
      this.changeLink(text, url)
    }

    // ISSUE: 如果修改的内容比之前的短，会导致光标位置错误
    this.quill.setSelection(cursor.index, cursor.length, "silent")
  }

  protected insertLink(cursor: RangeStatic, text: string, url: string) {
    this.quill.insertText(cursor.index, text, { "link": url }, "user")
  }

  protected changeLink(text: string, url: string) {
    const linkIndex = this.linkBlotIndex!
    const oldLength = text.length

    this.quill.focus()
    this.quill.deleteText(linkIndex, this.leaf.text.length, "user")
    this.quill.insertText(linkIndex, text, "user")
    this.quill.formatText(linkIndex, oldLength + 1, "link", url, "user")
  }

  public openLink() {
    this.loadUrlAndText()
    let linkElement = this.linkPatch()
    linkElement.href = this._url

    linkElement.click()
  }

  public openLinkSettings() {
    this.loadUrlAndText()
    super.openLinkSettings();
  }

  closeInlineToolbar() {
    this.restoreCursor()
    this.settings?.hidden()
  }

  copyLink() {
    try {
      this.quill.blur()
    } catch (e) { }
    super.copyLink()
  }

  removeLink(): void {
    if (!this.linkBlotIndex || !this.leaf) return
    this.quill.formatText(this.linkBlotIndex, this.leaf.text.length, "link", false, "silent")
    this.restoreCursor()
  }

  protected loadUrlAndText() {
    if (!this.range || !this.leaf) {
      this._text = ""
      this._url = ""
      return
    }

    let [leaf] = this.range ? this.quill.getLeaf(this.range.index) : [undefined]
    this.leaf = leaf
    const format = this.quill.getFormat(this.range)

    if (!format.link) return

    this._url = format.link
    this._text = this.leaf.text
  }

  protected linkPatch(): HTMLLinkElement {
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

  protected restoreCursor(sources?: Sources) {
    const cursor = this.range
    if (!cursor) return

    try {
      this.quill.setSelection(cursor.index, cursor.length, sources ?? 'silent')
    } catch (e) {

    }
  }

  static isLink(leaf: any): boolean {
    return leaf.parent.statics.blotName.toLowerCase() === "link"
  }

  static create(quill: Quill): ILinkBinding {

    const range = quill.getSelection() ?? undefined
    let [leaf] = range ? quill.getLeaf(range.index) : [undefined]

    leaf = this.isLink(leaf) ? leaf : undefined
    return new QuillLinkBinding(quill, range, leaf)
  }
}