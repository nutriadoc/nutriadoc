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

  public find(key: string): IView | undefined {
    return this._children.find(child => child.key === key)
  }

  render(): Node | Node[] {
    return this._element
  }
  
}