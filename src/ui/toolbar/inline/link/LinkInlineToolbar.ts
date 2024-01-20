import LinkOpenButton from "./LinkOpenButton.ts";
import {className, onClick, text} from "../../../views.ts"
import InlineToolbarItem from "../InlineToolbarItem.ts";
import {Copy, Edit, X} from "../../icons";
import InlineToolbarSeparatorItem from "../InlineToolbarSeparatorItem.ts";
import View from "../../../View.ts";
import i18n from "../../../../i18n";
import LinkSettings from "../../../link/LinkSettings.ts";
import InlineToolbar from "../InlineToolbar.ts";
import Editor from "../../../../editor/Editor.ts";
import Range from "../../../../editor/Range.ts";
import {Link} from "../../../../core";

// @ts-ignore
export default class LinkInlineToolbar extends View {

  protected current?: View

  protected settings: LinkSettings

  protected toolbar: InlineToolbar

  protected editor: Editor

  protected range: Range

  protected link: Link

  protected linkSettingCancelHandler = this.onLinkSettingCancel.bind(this)

  public constructor(element: HTMLElement, toolbar: InlineToolbar, editor: Editor, range: Range) {
    super(
      element,
      className("link-inline-toolbar")
    )

    this.toolbar = toolbar
    this.editor = editor
    this.range = range

    const link: Link = this.editor.getLink(range) ?? { url: "", text: "" }
    this.link = link

    this.settings = new LinkSettings(this.editor, this.range)
    this.settings.addEventListener('hidden', this.linkSettingCancelHandler)

    this.addElement(LinkInlineToolbar.nodes())

    this.find(className("edit"))
      ?.assignUnits(onClick(this.onEditClick.bind(this)))

    this.find(className("copy"))
      ?.assignUnits(onClick(this.onCopyClick.bind(this)))

    this.find(className("link-open"))
      ?.assignUnits(onClick(this.onOpenClick.bind(this)))

    this.find(className("remove"))
      ?.assignUnits(onClick(this.onRemoveClick.bind(this)))

    this.find(className("close"))
      ?.assignUnits(onClick(this.onCloseClick.bind(this)))

  }

  static nodes() {
    const t = i18n.t
    return [
      new LinkOpenButton(),
      new InlineToolbarSeparatorItem(),
      new InlineToolbarItem(Copy, className("inline-toolbar-item", "copy")),
      new InlineToolbarItem(Edit, className("inline-toolbar-item", "edit")),
      new InlineToolbarSeparatorItem(),
      new InlineToolbarItem(
        undefined,
        className("inline-toolbar-item", "remove"),
        text(t("link.remove"))
      ),
      new InlineToolbarSeparatorItem(),
      new InlineToolbarItem(
        X,
        className("inline-toolbar-item", "close"),
      ),
    ]
  }

  protected onCopyClick(_event: MouseEvent): void {
    this.editor.setSelection(this.range)

    navigator
      .clipboard
      .writeText(this.link.url)
      .then(() => {
      })
      .catch(() => {
      })
  }

  protected onRemoveClick(_event: MouseEvent): void {
    this.editor.removeLink(this.range)
    this.editor.setSelection(this.range)
    this.dispose()
  }

  protected onOpenClick(_event: MouseEvent): void {
    this.editor.openLink(this.link.url)
  }

  protected onCloseClick(_event: MouseEvent): void {
    this.dispose()

  }

  protected onEditClick(_event: MouseEvent): void {
    this.toolbar.disableAutoHide()

    this.settings.visible()
  }

  protected onLinkSettingCancel() {
    this.editor.setSelection(this.range)
  }

  dispose() {
    this.settings.removeEventListener('hidden', this.linkSettingCancelHandler)

    this.removeAllChild()
    super.dispose();
  }
}