import IView from "./IView.ts";
import IUnit from "./view/unit/IUnit.ts";
import Attribute from "./view/attribute/Attribute.ts";
import Content from "./view/content/Content.ts";
import TextContent from "./view/content/TextContent.ts";
import StyleUnit from "./view/unit/StyleUnit.ts";
import EventListenerUnit from "./view/listener/EventListenerUnit.ts";

export default class View extends EventTarget implements IView {

  protected _element: HTMLElement

  protected _children: IView[] = []

  protected _key: string = ""

  public class?: string | string[]

  protected _units: WeakSet<IUnit> = new WeakSet()

  protected _attributes: Map<string, Attribute> = new Map()

  public constructor(element?: HTMLElement) {
    super()
    this._element = element ?? document.createElement('div')

    this.initialize()
  }

  protected initialize() {

  }

  public addNode(node: Node | Node[]): void {
    if (node instanceof Node) {
      this._element.append(node)
    } else {
      const nodes = node as Node[]
      // nodes.forEach(this._element.appendChild)

      nodes.forEach(node => {
        try {
          this._element.append(node)
        } catch(e) {
          console.error(e)
        }
      })
    }
  }

  public addElement(element: IView | IView[]) {
    if (Array.isArray(element)) {
      this._children.push(...element)
      element.forEach(ele => this.addNode(ele.render()))
    } else {
      this._children.push(element)
      try {
        this.addNode(element.render())
      } catch (e) {
        console.error(e)
      }
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

  find(key: Attribute): IView | undefined
  find(key: string): IView | undefined
  find(key: string | Attribute): IView | undefined {
    if (typeof key === 'string') {
      return this._children.find(child => child.key === key)
    }

    return this._children.find(child => {
      const attr = child.attributes.get(key.key)
      if (attr?.value === key.value) return child

      return child.find(key)

    })
  }


  render(): Node | Node[] {
    if (this.key != '') {
      this._element.setAttribute('data-key', this.key)
    }

    if (this.className) {
      let className: string[]
      className = this.className.split(" ")

      // if (Array.isArray(this.className)) {
      //   this._element.classList.add(...this.className)
      // } else {
      className.forEach(name => this._element.classList.add(name))
        // this._element.classList.add(className)
      // }
    }

    return this._element
  }

  public assignUnits(...units: IUnit[]): IView {
    units.forEach(unit => {
      this._units.add(unit)

      if (unit instanceof Attribute) {
        this._element.setAttribute(unit.key, unit.value)
        this._attributes.set(unit.key, unit)
      }

      if (unit instanceof View)
        this.addElement(unit)

      this.assignContent(unit)

      if (unit instanceof StyleUnit) {
        this.assignStyle(unit)
      }

      this.assignEventListener(unit as EventListenerUnit)
    })

    return this
  }

  protected assignContent(content: Content) {
    if (content instanceof TextContent) {
      this.element.textContent = content.text
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

  static new(tag?: string) {
    if (!!tag) return new View(document.createElement(tag))

    return new View()
  }
}