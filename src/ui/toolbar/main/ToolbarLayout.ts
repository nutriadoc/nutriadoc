import IView from "../../IView.ts";
import ToolbarItem from "./items/ToolbarItem.ts";
import ToolbarItemFactory from "./items/ToolbarItemFactory.ts"
import FlexView from "../../FlexView.ts";
import {Measurable} from "../../../core";


export default class ToolbarLayout extends FlexView implements IView, Measurable {

  protected _children: IView[] = []

  protected _className?: string

  protected _items: Measurable[] = []

  protected _collapsed: IView[] = []

  protected _visibleItems: Measurable[] = []

  protected _sortedItems: ToolbarItem[] = []

  public constructor(children: Measurable[], className?: string) {
    const element = document.createElement('div')
    element.classList.add('layout')
    if (!!className) element.classList.add(className)
    super(element)

    this._items = children
    this._items.forEach(item => {
      const view = item as unknown as IView
      view.parent = this
    })

    this._className = className
    this._children = []
  }

  public render(): Node | Node[] {

    if (this._rendered) return this._element

    if (this._children) {
      this.addElement(this._children)
    }

    return super.render()
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

    for(let child of this._items) {
      if (child instanceof ToolbarItem) {
        items.push(child)
      } else if (child instanceof ToolbarLayout) {
        const layout = child as ToolbarLayout
        items = items.concat(layout.items)
      }
    }

    return items
  }

  get sortedItems(): ToolbarItem[] {
    const items = this.items.filter(item => !item.fixed)
    const hasWeight = items.filter(item => item.collapsedWeight > 0)
    const noWeight = items.filter(item => item.collapsedWeight == 0)

    return [...noWeight, ...hasWeight]
  }

  sortItems(): void {
    this._sortedItems = this.sortedItems
  }


  public layout(limitWidth: number) {
    this.sortItems()
    const sort = this._sortedItems

    this.visibleItems()

    for (let i = 0; i < 99; i++) {
      const width = this.width

      if (width < limitWidth) break

      const item = sort.pop()
      if (!item) break

      const layout = item.parent as unknown as ToolbarLayout
      layout.collapse(item)
    }

    this.reloadItems()
  }

  reloadItems() {
    this.removeAllChild()

    this
      ._visibleItems
      .filter(layout => 'reloadItems' in layout)
      .map(item => item as unknown as ToolbarLayout)
      .forEach(layout => (layout as unknown as ToolbarLayout).reloadItems())

    const visibleItems = this._visibleItems.map(item => item as unknown as IView)

    // TODO: render method should refactor
    this.addElement(visibleItems)
    visibleItems.forEach(item => { this.element.append(item.element) })
  }

  /**
   * make sure all items are visible
   */
  visibleItems() {
    this._visibleItems = [...this._items]

    // make the sub layout visible
    this._items
      .filter(item => item instanceof ToolbarLayout)
      .map(item => item as ToolbarLayout)
      .forEach(item => item.visibleItems())
  }

  get width(): number {
    return this
      ._visibleItems
      .reduce(
        (total, node) => total + node.width,
        0
      )
  }

  get height(): number {
    return 0
  }

  collapse(item: ToolbarItem): boolean {
    if (this._visibleItems.length == 0) return false
    this._visibleItems = this._visibleItems.filter(i => i !== item)
    this._collapsed.push(item)
    return true
  }

  public static simple(): ToolbarLayout {
    const factory = ToolbarItemFactory.shared;

    const bulletsLayout = new ToolbarLayout(
      [
        factory.bulletList(),
        factory.numberedList(),
        factory.indent(),
        factory.outdent(),
        factory.align(),
        factory.lineSpacing(),
        factory.quote(),
        factory.codeBlock(),
        // factory.hightBlock(),
        // factory.more(),
        // factory.search(),
      ],
    )

    const layout1 = new ToolbarLayout(
      [
        factory.undo(),
        factory.redo(),
        factory.formatPainter(),
        factory.clearFormatting(),
      ],
    )

    const formatLayout = new ToolbarLayout(
      [
        factory.styles(),
        factory.font(),
        factory.fontSize(),
        factory.increaseFontSize(),
        factory.decreaseFontSize(),
        factory.bold(),
        factory.italic(),
        factory.underline(),
        factory.strike(),
        factory.superscript(),
        factory.subscript(),
        factory.highlight(),
        factory.color(),
      ]
    )

    const complexityLayout = new ToolbarLayout(
      [factory.switchComplexity()],
      'simple-layout-right'
    )

    const layout2 = new ToolbarLayout(
      [
        factory.insert(),
        layout1,
        formatLayout,
        bulletsLayout,
      ],
      'simple-layout-main'
    )

    return new ToolbarLayout(
      [
        layout2,
        complexityLayout
      ],
      'layout-root'
    )
  }
}