import {className, IUnit, View} from "@nutriadoc/classes"
import {FieldMessageLevel} from "./index"

import './FieldMessage.scss'

export default class FieldMessage extends View {
  constructor(level: FieldMessageLevel, ...units: IUnit[]) {

    let levelClass: string
    if (level == FieldMessageLevel.Error) {
      levelClass = 'field-message-error'
    } else if (level == FieldMessageLevel.Warning) {
      levelClass = 'field-message-warning'
    } else if (level == FieldMessageLevel.Success) {
      levelClass = 'field-message-success'
    } else {
      levelClass = 'field-message-info'
    }

    super(
      undefined,
      className("field-message", levelClass),
      ...units
    )
  }
}