import IView from "../../IView.ts";
import ToolbarItem from "./items/ToolbarItem.ts";
import ToolbarItemFactory from "./items/ToolbarItemFactory.ts"
import FlexView from "../../FlexView.ts";

export default class ToolbarLayout extends FlexView implements IView {

  protected _children: IView[] = []

  protected _className?: string

  public constructor(children: IView[], className?: string) {
    const element = document.createElement('div')
    element.classList.add('layout')
    if (!!className) element.classList.add(className)
    super(element)

    this._className = className
    this._children = children
  }

  public render(): Node | Node[] {

    if (this._children) {
      this.addElement(this._children)
    }

    return this._element
  }

  public findItem(key: string): ToolbarItem | undefined {
    let item: ToolbarItem | undefined

    for(let child of this._children) {
      if (child instanceof ToolbarItem) {
        const anItem = child as ToolbarItem
        if (anItem.key == key) {
          item = anItem
          break
        }
      } else if (child instanceof ToolbarLayout) {
        const layout = child as ToolbarLayout
        item = layout.findItem(key)
        if (!!item)
          break
      }
    }

    return item
  }


  public get items(): ToolbarItem[] {
    let items: ToolbarItem[] = []

    for(let child of this._children) {
      if (child instanceof ToolbarItem) {
        items.push(child)
      } else if (child instanceof ToolbarLayout) {
        const layout = child as ToolbarLayout
        items = items.concat(layout.items)
      }
    }

    return items
  }

  public static simple(): ToolbarLayout {
    const factory = ToolbarItemFactory.shared;

    const items = [
      factory.undo(),
      factory.redo(),
      factory.separator(),
      factory.insert(),
      factory.separator(),
      factory.styles(),
      factory.font(),
      factory.fontSize(),
      factory.increaseFontSize(),
      factory.decreaseFontSize(),
      factory.bold(),
      factory.italic(),
      factory.underline(),
      factory.strike(),
      factory.highlight(),
      factory.color(),
      factory.separator(),
      factory.bulletList(),
      factory.numberedList(),
      factory.indent(),
      factory.outdent(),
      factory.align(),
      factory.lineSpacing(),
      factory.separator(),
      factory.quote(),
      // factory.hightBlock(),
      // factory.more(),
      // factory.search(),

    ]

    const l1 = new ToolbarLayout(items, 'simple-layout-main')
    l1.flex = "1 0 auto"
    const l2 = new ToolbarLayout([factory.switchComplexity()], 'simple-layout-right')

    const l = new ToolbarLayout([l1, l2], 'simple-layout')
    l.flex = "1 0 auto"
    return l
  }
}