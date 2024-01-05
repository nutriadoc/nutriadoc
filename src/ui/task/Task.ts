
export default class Task extends EventTarget {

  protected _key: string

  public constructor() {
    super()
    this._key = ""
  }

  run(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  cancel(): void {
    throw new Error("Method not implemented.");
  }

  progress(_loaded: number, _length: number): void {

  }

  success(): void {

  }

  fail(): void {

  }

  get key(): string {
    return this._key
  }
}