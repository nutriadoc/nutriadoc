import IElement from "./IElement";

export default class AbstractElement extends EventTarget implements IElement {

  protected _element: HTMLElement

  public constructor(element: HTMLElement) {
    super()
    this._element = element
  }

  public addNode(node: Node | Node[]): void {
    if (node instanceof Node) {
      this._element.appendChild(node)
    } else {
      const nodes = node as Node[]
      nodes.forEach(this._element.appendChild)
    }
  }

  public addElement(element: IElement | IElement[]) {
    if (Array.isArray(element)) {
      element.forEach(ele => this.addNode(ele.render()))
    } else {
      this.addNode(element.render())
    }
  }

  public get element(): HTMLElement {
    return this._element
  }

  render(): Node | Node[] {
    return this._element
  }
  
}