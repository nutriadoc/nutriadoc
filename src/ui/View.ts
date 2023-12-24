import IView from "./IView.ts";

export default class View extends EventTarget implements IView {

  protected _element: HTMLElement

  protected _children: IView[] = []

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

  public get element(): HTMLElement {
    return this._element
  }

  public get children(): IView[] {
    return this._children
  }

  render(): Node | Node[] {
    return this._element
  }
  
}