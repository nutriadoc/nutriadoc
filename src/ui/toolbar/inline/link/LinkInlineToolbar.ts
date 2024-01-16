import InlineToolbar from "../InlineToolbar.ts"
import LinkOpenButton from "./LinkOpenButton.ts";
import {className, name, onClick, text} from "../../../views.ts"
import InlineToolbarItem from "../InlineToolbarItem.ts";
import {Copy, Edit, X} from "../../icons";
import InlineToolbarSeparatorItem from "../InlineToolbarSeparatorItem.ts";
import ILinkBinding from "../../../link/ILinkBinding.ts";
import View from "../../../View.ts";
import i18n from "../../../../i18n";

// @ts-ignore
export default class LinkInlineToolbar extends InlineToolbar {

  protected _binding?: ILinkBinding

  public constructor(element: HTMLElement) {
    super(
      element,
      LinkInlineToolbar.nodes()
    )

    this.addElement(this._children)

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
    this._binding?.copyLink()
  }

  protected onRemoveClick(_event: MouseEvent): void {
    this._binding?.removeLink()
    this.hidden()
  }

  protected onOpenClick(_event: MouseEvent): void {
    this._binding?.openLink()
    this.visible()
  }

  protected onCloseClick(_event: MouseEvent): void {
    this.hidden()
    this._binding?.closeInlineToolbar()
  }

  protected onEditClick(_event: MouseEvent): void {
    this.hidden()
    this._binding?.openLinkSettings()
  }

  public visible(relative?: HTMLElement | View | undefined, container?: View) {
    super.visible(relative, container)
  }

  public set binding(value: ILinkBinding | undefined) {
    this._binding = value
    const linkOpen = this.find(name("link_open")) as LinkOpenButton

    const url = value?.url
    if (url)
      linkOpen.link = url
  }
}