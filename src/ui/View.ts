import IView from "./IView.ts";

export default class View extends EventTarget implements IView {

  protected _element: HTMLElement

  protected _children: IView[] = []

  protected _key: string = ""

  public constructor(element: HTMLElement) {
    super()
    this._element = element
  }

  public addNode(node: Node | Node[]): void {
    if (node instanceof Node) {
      this._element.append(node)
    } else {
      const nodes = node as Node[]
      nodes.forEach(this._element.appendChild)
    }
  }

  public addElement(element: IView | IView[]) {
    if (Array.isArray(element)) {
      this._children.push(...element)
      element.forEach(ele => this.addNode(ele.render()))
    } else {
      this._children.push(element)
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

  public find(key: string): IView | undefined {
    return this._children.find(child => child.key === key)
  }

  render(): Node | Node[] {
    if (this.key != '') {
      this._element.setAttribute('data-key', this.key)
    }
    return this._element
  }
  
}