
export default class User {

  name: string

  color: string

  constructor(name: string, color?: string) {
    this.name = name
    this.color = color ?? "black"
  }
}