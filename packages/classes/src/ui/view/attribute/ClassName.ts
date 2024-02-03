import Attribute from "./Attribute.ts";

export default class ClassName extends Attribute {

  protected _classes: string[] = []

  constructor(value: string[])
  constructor(value: string)
  constructor(value: string | string[])
  public constructor(value: string | string[]) {
    super("class", Array.isArray(value) ? value.join(" ") : value)

    this._classes = Array.isArray(value) ? value : value.split(" ")
  }

  public get classes(): string[] {
    return this._classes
  }

  public contains(className: ClassName): boolean {
    return className.classes.every(c => this.classes.includes(c))
  }

  public add(...name: string[]) {
    name.forEach(n => {
      this._classes.push(n)
    })
  }

  public remove(...name: string[]) {
    this._classes = this.classes.filter(c => !name.includes(c))
  }

  public static merge(className: ClassName[]): ClassName {
    return new ClassName([... new Set(className.map(x => x.classes).flatMap(x => x))])
  }
}