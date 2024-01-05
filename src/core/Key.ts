export default class Key {

  static increment: number = 0

  protected _int: number

  public constructor(value?: number) {
    if (value !== undefined) {
      this._int = value
    } else {
      this._int = Key.increment++
    }
  }

  public get int(): number {
    return this._int
  }

  public toString(): string {
    return this._int.toString()
  }

  static of(value: string): Key
  static of(value: number | string): Key {
    if (typeof value === "string") return new Key(parseInt(value))
    return new Key(value)
  }
}