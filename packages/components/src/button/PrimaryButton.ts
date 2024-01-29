import {Button} from "./index"
import {className, IUnit} from "@nutriadoc/classes"
import {ButtonProps} from "./Button";

export default class PrimaryButton extends Button {
  constructor(props?: ButtonProps, ...units: IUnit[]) {
    super(props, ...units, className("primary-button"));
  }
}