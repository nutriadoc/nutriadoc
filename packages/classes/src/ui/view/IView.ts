
import
{
  IUnit,
  Attribute,
  View
} from "./index"

import { IDisposable } from "../../";

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

  add(view: IView): void
  add(view: IView[]): void
  add(view: View[]): void
  add(view: View): void

  added(): void

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

  findDescendants(callback: (view: IView) => boolean): IView[]

  remove(): void

  removeAllChild(): void
}