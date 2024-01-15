import IUnit from "./view/unit/IUnit.ts";
import Attribute from "./view/attribute/Attribute.ts";
import IDisposable from "../core/IDisposable.ts";

export default interface IView extends IUnit, EventTarget, IDisposable  {

  get key(): string

  set key(value: string)

  get className(): string

  set className(value: string)

  get attributes(): Map<string, Attribute>

  get parent(): IView | undefined

  set parent(value: IView)

  addNode(node: Node | Node[]): void

  addElement(element: IView | IView[]): void

  addTo(parent: HTMLElement): void

  style?: CSSStyleDeclaration

  render(): Node | Node[]

  hide(): void

  visible(): void

  addClass(...classes: string[]): void

  removeClass(...classes: string[]): void

  get element(): HTMLElement

  get children(): IView[]

  assignUnits(...units: IUnit[]): IView

  find(key: Attribute): IView | undefined
  find(key: string): IView | undefined

  findAll(key: Attribute): IView[]

  remove(): void

  removeAllChild(): void
}