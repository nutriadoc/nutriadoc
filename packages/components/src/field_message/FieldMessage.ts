import {className, IUnit, View} from "@nutriadoc/classes"
import {FieldMessageLevel} from "./index"

import './FieldMessage.scss'

export default class FieldMessage extends View {

  protected _level: FieldMessageLevel

  constructor(level: FieldMessageLevel, ...units: IUnit[]) {

    super(
      undefined,
      className("field-message"),
      ...units
    )

    this.level = level
  }

  get level() {
    return this._level
  }

  set level(value: FieldMessageLevel) {
    this._level = value

    this.removeAllClass()
    this.addClass("field-message", this.getClass(value))
  }

  getClass(level: FieldMessageLevel) {
    if (level == FieldMessageLevel.Error) {
      return 'field-message-error'
    } else if (level == FieldMessageLevel.Warning) {
      return 'field-message-warning'
    } else if (level == FieldMessageLevel.Success) {
      return 'field-message-success'
    } else {
      return 'field-message-info'
    }
  }
}