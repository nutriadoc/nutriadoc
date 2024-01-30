import {className, IUnit, View} from "@nutriadoc/classes";
import "./Input.scss"

export default class Input extends View {
  constructor(...units: IUnit[]) {
    super(
      document.createElement("input"),
      className("input"),
      ...units
    );
  }
}