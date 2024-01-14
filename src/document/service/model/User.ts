import {randomColor} from "../../../ui/color_picker/Colors.ts";

export default class User {

  name: string

  color: string

  constructor(name: string, color?: string) {
    this.name = name
    this.color = color ?? randomColor()
  }
}