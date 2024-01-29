import {Button} from "./index"
import {className, IUnit} from "@nutriadoc/classes"

export default class PrimaryButton extends Button {
  constructor(...units: IUnit[]) {
    super(...units, className("primary-button"));
  }
}