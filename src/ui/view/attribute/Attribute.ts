import IUnit from "../unit/IUnit.ts";

export default class Attribute implements IUnit {

  protected _key: string = ""

  protected _value: string = ""

  public constructor(key: string, value: string) {
    this._key = key
    this._value = value
  }

  public get key(): string {
    return this._key
  }

  public get value(): string {
    return this._value
  }
}