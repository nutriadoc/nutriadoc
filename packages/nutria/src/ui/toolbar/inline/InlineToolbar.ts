import {className, contentEditable, IView, View, Floating, Position} from "@nutriadoc/classes";
import IToolbar from "../IToolbar.ts";
import Menu from "../../menu/Menu.ts";
import Range from "../../../editor/Range.ts";
import LinkInlineToolbar from "./link/LinkInlineToolbar.ts";
import ToolbarItem from "../main/items/ToolbarItem.ts";
import Editor from "../../../editor/Editor.ts";

export default class InlineToolbar extends Floating implements IView, IToolbar {
  class = 'inline-toolbar'

  protected current?: IView

  protected editor: Editor

  style = {
    display: 'flex',
  } as CSSStyleDeclaration

  protected container: View

  public constructor(container: IView, editor: Editor) {
    super(Position.TopLeft, [], "element", 5)
    this.assignUnits(className("inline-toolbar"))
    this.container = container as View
    this.editor = editor

    container.addElement(this)
    this.assignUnits(contentEditable(false))
  }

  public visible(relative?: HTMLElement | View | undefined, container?: View) {
    super.visible(relative, container);

    this._element.style.cursor = "pointer"
  }

  getSelectionNode(_: Range): Node | undefined {
    return undefined
  }

  linkToolbar(node: HTMLElement, range: Range) {
    this.current = new LinkInlineToolbar(this.element, this, this.editor, range)

    this.visible(node, this.container)
  }

  onEditorSelectionChange(range: Range): void {
    this.current?.dispose()

    const node = this.getSelectionNode(range)

    if (this.isLink()) {
      this.linkToolbar(node as HTMLElement, range)
    }
  }

  isLink(): boolean {
    return false
  }

  activeItem(_: string): void {
  }

  activeMenuItem(_: string, __: string): void {
  }

  deactiveItem(_: string): void {
  }

  disableToolbarItem(_: string): void {
  }

  enableToolbarItem(_: string): void {
  }

  findMenu(_: string): Menu | undefined {
    return undefined;
  }

  findToolbarItem(_: string): ToolbarItem | undefined {
    return undefined;
  }

  setToolbarItemText(_: string, __: string): void {
  }
}