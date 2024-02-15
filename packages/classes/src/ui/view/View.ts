import {
  IView,
  IUnit,
  Attribute,
  ClassName,
  StyleUnit,
  Property,
  TextContent,
  EventListenerUnit,
  Content
} from "./index"
import {bind, isBinding} from "../../core";


export default class View extends EventTarget implements IView, EventTarget {

  protected _element: HTMLElement

  protected _children: IView[] = []

  protected _key: string = ""

  public class?: string | string[]

  _parent?: IView

  protected _units: Set<IUnit> = new Set<IUnit>()

  protected _attributes: Map<string, Attribute> = new Map()

  protected _rendered: boolean = false

  public id: number = View.id ++

  static id: number = 0

  static views: Map<string, View> = new Map<string, View>()

  static nodes: WeakMap<Node, View> = new WeakMap<Node, View>()

  public constructor(element?: HTMLElement, ...units: IUnit[]) {
    super()
    this._element = element ?? document.createElement('div')

    this.assignUnits(...units)
    this.assignUnits(new Attribute("data-view-id", this.id.toString()))

    View.views.set(this.id.toString(), this)
    View.nodes.set(this._element, this)


    this.initialize()
  }

  protected initialize() {
  }

  protected assignId() {
    this.assignUnits(new Attribute("data-view-id", this.id.toString()))
  }

  public hide(): void {
    // this._element.classList.remove('visible')
    this._element.classList.add('hidden')
  }

  public visible() {
    this._element.classList.remove('hidden')
    // this._element.classList.add('visible')
  }

  public addNode(node: Node | Node[]): void {
    if (node instanceof Node) {
      if (!node.parentNode)
        this._element.append(node)
    } else
      node.forEach(this.addNode)
  }

  add(view: IView): void
  add(view: IView[]): void
  add(view: View[]): void
  add(view: View): void
  add(view: View | View[] | IView | IView[]): void {
    if (view instanceof View) {
      this._children.push(view)
      this.addNode(view.render())
      view._parent = this
      view.added()
    } else if (Array.isArray(view)) {
      view.forEach(v => this.add(v))
    }
  }

  added(): void {

  }

  public addElement(element: IView | IView[]) {
    if (Array.isArray(element)) {
      element.forEach(ele => this.addElement(ele))
    } else {
      this._children.push(element)
      element.parent = this
      this.addNode(element.render())
    }
  }

  public addTo(parent: HTMLElement): void {
    parent.appendChild(this._element)
  }

  public get element(): HTMLElement {
    return this._element
  }

  public get children(): IView[] {
    return this._children
  }

  public get key(): string {
    return this._key
  }

  public set key(value: string) {
    this._key = value
  }

  public get className(): string {
    return this._element.className
  }

  public set className(value: string) {
    this._element.className = value
  }

  static find(node: Node) {
    return View.nodes.get(node)
  }

  find(key: Attribute): IView | undefined
  find(key: string): IView | undefined
  find(key: string | Attribute): IView | undefined {
    if (key instanceof ClassName) {
      return this._children.find(child => {
        const className = child.attributes.get('class')
        if (!className) return false

        return key.classes.every(c => className.value.includes(c))
      })
    }

    if (typeof key === 'string') {
      return this._children.find(child => child.key === key)
    }

    return this._children.find(child => {
      const attr = child.attributes.get(key.key)
      if (attr?.value === key.value) return child

      return child.find(key)

    })
  }

  findAll(key: Attribute): IView[] {
    if (key instanceof ClassName) {
      return this._children.filter(child => {
        const className = child.attributes.get('class') as ClassName
        if (!className) return false

        return className.contains(key)
      })
    }

    return []
  }

  findDescendants(callback: (view: IView) => boolean): IView[] {
    const descendants: IView[] = []

    this._children.forEach(child => {
      if (callback(child)) {
        descendants.push(child)
      }

      descendants.push(...child.findDescendants(callback))
    })

    return descendants
  }


  render(): Node | Node[] {
    if (this._rendered) return this._element

    if (this.key != '') {
      this._element.setAttribute('data-key', this.key)
    }

    if (this.className) {
      let className: string[]
      className = this.className.split(" ")
      className.forEach(name => this._element.classList.add(name))
    }

    this.children
      .map(child => child.render())
      .forEach(nodes => this.addNode(nodes))

    this._rendered = true

    return this._element
  }

  renderNode() {
    const node = this.render()
    if (Array.isArray(node))
      if (node.length > 1) throw new Error("Node is an array of nodes")
      else return node[0]
    else
      return node
  }

  public assignUnits(...units: IUnit[]): IView {

    units = [...this._units, ...units]

    const className = ClassName
      .merge(
        units
          .filter(unit => unit instanceof ClassName)
          .map(x => x as ClassName)
      )

    units = units.filter(u => !(u instanceof ClassName))
      .concat(className)

    units
      .filter(unit => !!unit)
      .forEach(unit => {

      this._units.add(unit)

      this.assignAttribute(unit)

      // replace 'render' in unit of instanceof View
      // if (Object.keys(unit).includes('render'))
      if (unit instanceof View || Object.keys(unit).includes('_rendered')) {
        this.addElement(unit as View)
      }

      this.assignContent(unit)

      if (unit instanceof StyleUnit) {
        this.assignStyle(unit)
      }

      this.assignEventListener(unit as EventListenerUnit)
    })

    return this
  }

  protected assignAttribute(unit: IUnit) {
    if (!(unit instanceof Attribute)) return

    if (unit instanceof ClassName) {
      if (unit.classes.length == 0) return

      this._element.classList.add(...unit.classes)
    } else if (unit instanceof Property) {
      const v: any = {}
      v[unit.key] = unit.value
      Object.assign(this._element, v)
    } else {
      this._element.setAttribute(unit.key, unit.value)
    }

    if (isBinding(unit.value)) {
      bind(unit.value, (___: any, _: string | number | symbol, newValue: any, __: any) => {
        this._element.setAttribute(unit.key, newValue)
      })
    }

    this._attributes.set(unit.key, unit)
  }

  protected assignContent(content: Content) {
    if (content instanceof TextContent) {
      this.element.textContent = content.text

      if (isBinding(content.text)) {
        bind(content.text, (___: any, _: string | number | symbol, newValue: any, __: any) => {
          this.element.textContent = newValue
        })
      }
    }
  }

  protected assignStyle(unit: StyleUnit) {
    Object.keys(unit.styles).forEach(key => {
      (this.element.style as any)[key] = unit.styles[key]
    })
  }

  protected assignEventListener(unit: IUnit) {
    if (!(unit instanceof EventListenerUnit)) return

    this.element.addEventListener(unit.type, unit.listener as any)
  }

  get attributes(): Map<string, Attribute> {
    return this._attributes
  }

  public remove() {
    this.element.remove()
  }

  removeAllChild(): void {
    this._children.forEach(child => this.removeChild(child))

    for (; this.element.children.length > 0;) {
      this.element.children.item(0)?.remove()
    }
  }

  public removeChild(view: IView) {
    view.element.remove()
    this._children = this._children.filter(c => c !== view)
  }

  dispose() {
    this._units.forEach(unit => {
      if (unit instanceof EventListenerUnit) {
        this.element.removeEventListener(unit.type, unit.listener as any)
      }
    })
  }

  public get parent(): IView | undefined {
    return this._parent
  }

  set parent(value: IView) {
    this._parent = value

  }

  addClass(...name: string[]): void {
    const className = this.attributes.get('class') as ClassName | undefined
    if (!className)
      this.assignUnits(new ClassName(name))
    else
      className?.add(...name)

    this.element.classList.add(...name)
  }

  removeClass(...name: string[]): void {
    const className = this.attributes.get('class') as ClassName | undefined
    className?.remove(...name)

    this.element.classList.remove(...name)
  }

  removeAllClass() {
    this.element.className = ""
    const className = this.attributes.get('class') as ClassName | undefined
    className?.removeAll()
  }

  getAttribute(key: string): string | undefined {
    return this._attributes.get(key)?.value
  }

  static new<T extends View>(tag?: string, ...units: IUnit[]): View {
    if (!!tag) return new View(document.createElement(tag), ...units) as T

    return new View(undefined, ...units)
  }
}