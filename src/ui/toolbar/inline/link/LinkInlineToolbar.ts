import InlineToolbar from "../InlineToolbar.ts"
import LinkOpen from "./LinkOpen.ts";
import {className, onClick, text} from "../../../views.ts"
import InlineToolbarItem from "../InlineToolbarItem.ts";
import {Copy, Edit, X} from "../../icons";
import InlineToolbarSeparatorItem from "../InlineToolbarSeparatorItem.ts";
import QuillLinkBinding from "../../../../editor/quilljs/QuillLinkBinding.ts";
import Quill, {RangeStatic} from "quill";
import View from "../../../View.ts";

export default class LinkInlineToolbar extends InlineToolbar {

  protected _href: string = ""

  protected quill: Quill

  protected cursor?: RangeStatic

  public constructor(element: HTMLElement, quill: Quill) {
    super(
      element,
      LinkInlineToolbar.nodes()
    )

    this.quill = quill

    this.addElement(this._children)

    this.find(className("inline-toolbar-item edit"))
      ?.assignUnits(onClick(this.onEditClick.bind(this)))
  }

  static nodes() {
    return [
      (new LinkOpen()).assignUnits(
        text("Open link")
      ),
      new InlineToolbarSeparatorItem(),
      (new InlineToolbarItem(Copy)),
      (new InlineToolbarItem(Edit, className("inline-toolbar-item edit"))),
      new InlineToolbarSeparatorItem(),
      new InlineToolbarItem(X),
    ]
  }


  protected onEditClick(event: MouseEvent): void {
    event.preventDefault()
    event.stopPropagation()

    this.hidden()

    new QuillLinkBinding(this.quill).openLink()

    // if (this.cursor)
    //   this.quill.setSelection(this.cursor)

  }

  public render(): Node | Node[] {
    const node = super.render();

    // this.element.style.position = "relative"
    return node
  }

  public get href(): string {
    return this._href
  }

  public set href(value: string) {
    const link = this.find(className("link-open"))?.element as HTMLLinkElement | undefined
    if (!link) return
    link.href = value
    this._href = value
  }

  public visible(relative?: HTMLElement | View | undefined, container?: View) {
    super.visible(relative, container)

    this.cursor = this.quill.getSelection(false) ?? undefined
  }

  dismiss() {

    console.debug("dismiss")
    super.dismiss();
  }
}