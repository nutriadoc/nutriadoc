import IUnit from "../unit/IUnit.ts";

export default class EventListenerUnit implements IUnit {
  protected _type: string

  protected _listener: Function

  public constructor(type: string, listener: Function) {
    this._type = type
    this._listener = listener
  }

  public get type(): string {
    return this._type
  }

  public get listener(): Function {
    return this._listener
  }
}