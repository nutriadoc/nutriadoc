import IView from "./IView"

export default interface IFlexView extends IView {

  set flex(value: string)

  get flex(): string

  set justifySelf(value: string)

  get justifySelf(): string
}