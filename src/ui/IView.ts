export default interface IView {

  get key(): string

  set key(value: string)

  addNode(node: Node | Node[]): void

  addElement(element: IView | IView[]): void

  render(): Node | Node[]

  get element(): HTMLElement

  find(key: string): IView | undefined
}