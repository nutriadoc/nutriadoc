export default interface IElement {

  addNode(node: Node | Node[]): void

  addElement(element: IElement | IElement[]): void

  render(): Node | Node[]

  get element(): HTMLElement
}