export default class TaskProgressEvent extends Event {

  protected _loaded: number

  protected _length: number

  public constructor(loaded: number, length: number) {
    super("progress")
    this._loaded = loaded
    this._length = length
  }
}