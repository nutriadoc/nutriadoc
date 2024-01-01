import IUnit from "./view/unit/IUnit.ts";
import Attribute from "./view/attribute/Attribute.ts";

export default interface IView extends IUnit {

  get key(): string

  set key(value: string)

  get className(): string

  set className(value: string)

  get attributes(): Map<string, Attribute>

  addNode(node: Node | Node[]): void

  addElement(element: IView | IView[]): void

  style?: CSSStyleDeclaration

  render(): Node | Node[]

  get element(): HTMLElement

  get children(): IView[]

  assignUnits(...units: IUnit[]): IView

  find(key: Attribute): IView | undefined;
  find(key: string): IView | undefined

}