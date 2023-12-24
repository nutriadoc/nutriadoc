export default interface IView {

  addNode(node: Node | Node[]): void

  addElement(element: IView | IView[]): void

  render(): Node | Node[]

  get element(): HTMLElement
}