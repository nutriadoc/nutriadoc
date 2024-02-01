import ToolbarItem from "./items/ToolbarItem.ts"
import ToolbarItemFactory from "./items/ToolbarItemFactory.ts"
import { IView, View, Measurable, Direction, className, IUnit } from "@nutriadoc/classes"
import Layout from "./Layout.ts"


export default class ToolbarAccordionLayout extends Layout {

  protected _children: IView[] = []

  protected _allItems: Measurable[] = []

  protected _collapsed: IView[] = []

  protected _visibleItems: Measurable[] = []

  protected _sortedItems: ToolbarItem[] = []

  protected more: ToolbarItem = ToolbarItemFactory.shared.more()

  public constructor(children: Measurable[], ...units: IUnit[]) {
    super(Direction.Horizontal, ...units)

    this._allItems = [...children]
    this._items = children
    this._items.forEach(item => {
      const view = item as unknown as ToolbarItem
      view.layout = this
      view.parent = this
    })

    this._children = []

    this.more.parent = this

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
      } else if (child instanceof ToolbarAccordionLayout) {
        const layout = child as ToolbarAccordionLayout
        item = layout.findItem(key)
        if (!!item)
          break
      }
    }

    return item
  }


  public get items(): ToolbarItem[] {
    let items: ToolbarItem[] = []

    for(let child of this._allItems) {
      if (child instanceof ToolbarItem) {
        items.push(child)
      } else if (child instanceof ToolbarAccordionLayout) {
        const layout = child as ToolbarAccordionLayout
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
    this._collapsed = []
    const sort = this.sortedItems

    this.initializeAllToolbarItems()

    for (let i = 0; i < 99; i++) {
      const width = this.width
      if (width < limitWidth) break

      const item = sort.pop()
      if (!item) break

      const layout = item.layout as unknown as ToolbarAccordionLayout

      // Layout not have collapse method
      if (layout.collapse?.(item)) {
        layout.visibleMore()
      }
    }

    this.reloadItems()
    this.mergeMultipleMore()
  }

  protected mergeMultipleMore() {

    const set = new Set(this.findDescendants(view => view instanceof ToolbarItem && view.key == "more"))
    const moreItems = Array.from(set) as ToolbarItem[]

    if (set.size <= 1) return

    // const removing = moreItems.filter(
    //   item => (item.parent as ToolbarAccordionLayout).allItemsAreCollapsed
    // )
    const removing = [...moreItems]

    const final = removing.pop() // moreItems.filter(i => !removing.some(item => i == item)).pop()
    if (!final) return

    const layout = final.parent as ToolbarAccordionLayout

    const layouts = [layout, ...removing.map(item => item.parent as ToolbarAccordionLayout)]
      .map(layout => {
        const l = new Layout(Direction.Horizontal)
        layout._collapsed.forEach(c => {
          l.add(c as View)
          l._items.push(c as unknown as Measurable)
          c.render()
        })
        return l
      })

    layout._collapsed = layouts

    removing.forEach(item => item.remove())
    layouts.forEach(layout => layout.render())
    this._collapsed = [new Layout(Direction.Vertical, ...layouts, className("collapsed-layout"))]

  }

  reloadItems() {
    this.removeAllChild()

    this._allItems.forEach(item => (item as unknown as IView).remove())


    this
      ._items
      .filter(layout => 'reloadItems' in layout)
      .map(item => item as unknown as ToolbarAccordionLayout)
      .forEach(layout => (layout as unknown as ToolbarAccordionLayout).reloadItems())

    let items = this._items.map(item => item as unknown as IView)

    // TODO: render method should refactor
    this.addElement(items)
    items.forEach(item => { this.element.append(item.element) })
    items.forEach(item => item.parent = this)
    this._children = items
  }

  /**
   * make sure all items are visible
   */
  initializeAllToolbarItems() {

    this.removeAllChild()
    this._collapsed = []

    this._visibleItems = [...this._allItems]
    this._items = this._visibleItems

    // make the sub layout visible
    this._items
      .filter(item => item as unknown instanceof ToolbarAccordionLayout)
      .map(item => item as ToolbarAccordionLayout)
      .forEach(item => item.initializeAllToolbarItems())
  }

  visibleMore() {
    if (this._items.some(item => item === this.more)) return
    this._items.push(this.more)
  }

  get width(): number {
    if (this.allItemsAreCollapsed) return 28

    return super.width
  }

  get height(): number {
    return 0
  }

  collapse(item: ToolbarItem): boolean {
    if (this._items.length == 0) return false
    this._items = this._items.filter(i => i !== item)
    this._collapsed.unshift(item)
    return true
  }

  getCollapsed(): View[] {
    return this._collapsed.map(item => item as unknown as View)
  }

  get hasCollapsed(): boolean {
    return this._collapsed.length > 0
  }

  get allItemsAreCollapsed() {
    return this.hasCollapsed && this._items.length == 1
  }

  public static simple(): ToolbarAccordionLayout {
    const factory = ToolbarItemFactory.shared;

    const bulletsLayout = new ToolbarAccordionLayout(
      [
        factory.bulletList(),
        factory.numberedList(),
        factory.indent(),
        factory.outdent(),
        factory.align(),
        factory.lineSpacing(),
        factory.quote(),
        factory.codeBlock(),
        // factory.separator(),
        // factory.hightBlock(),
        // factory.more(),
        // factory.search(),
      ],
    )

    const layout1 = new ToolbarAccordionLayout(
      [
        factory.undo(),
        factory.redo(),
        factory.formatPainter(),
        factory.clearFormatting(),
        factory.separator(),
      ],
    )

    const formatLayout = new ToolbarAccordionLayout(
      [
        factory.insert(),
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
        factory.separator(),
      ]
    )

    // const complexityLayout = new ToolbarAccordionLayout(
    //   [factory.switchComplexity()],
    //   'simple-layout-right'
    // )

    const layout2 = new ToolbarAccordionLayout(
      [
        layout1,
        formatLayout,
        bulletsLayout,
      ],
      className('simple-layout-main'),
      className('flex', 'flex-1')
    )

    return new ToolbarAccordionLayout(
      [
        layout2,
        // complexityLayout
      ],
      className("layout-root")
    )
  }
}