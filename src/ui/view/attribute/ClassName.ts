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

  public static merge(className: ClassName[]): ClassName {
    return new ClassName(className.map(x => x.classes).flatMap(x => x))
  }
}