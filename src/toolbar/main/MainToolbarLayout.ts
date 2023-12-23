import AbstractElement from "../../ui/AbstractElement";
import IElement from "../../ui/IElement";
import MainToolbarItem from "./MainToolbarItem";
import MainToolbarItemFactory from "./MainToolbarItemFactory"

export default class MainToolbarLayout extends AbstractElement implements IElement {

  protected _children: IElement[] = []

  protected _className?: string

  public constructor(children: IElement[], className?: string) {
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

  public findItem(key: string): MainToolbarItem | undefined {
    let item: MainToolbarItem | undefined

    for(let child of this._children) {
      if (child instanceof MainToolbarItem) {
        const anItem = child as MainToolbarItem
        if (anItem.key == key) {
          item = anItem
          break
        }
      } else if (child instanceof MainToolbarLayout) {
        const layout = child as MainToolbarLayout
        item = layout.findItem(key)
        if (!!item)
          break
      }
    }

    return item
  }


  public get items(): MainToolbarItem[] {
    let items: MainToolbarItem[] = []

    for(let child of this._children) {
      if (child instanceof MainToolbarItem) {
        items.push(child)
      } else if (child instanceof MainToolbarLayout) {
        const layout = child as MainToolbarLayout
        items = items.concat(layout.items)
      }
    }

    return items
  }

  public static simple(): MainToolbarLayout {
    const factory = MainToolbarItemFactory.shared;

    const items = [
      factory.undo(),
      factory.redo(),
      factory.separator(),
      factory.insert(),
      factory.separator(),
      factory.body(),
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
      factory.hightBlock(),
      factory.more(),
      factory.search(),
      factory.switchComplexity(),
    ]

    const layout = new MainToolbarLayout(items, 'simple-layout')
    return layout
  }
}