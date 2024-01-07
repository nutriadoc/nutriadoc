import TaskProgressEvent from "./TaskProgressEvent.ts";
import TaskSuccessEvent from "./TaskSuccessEvent.ts";

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

  }

  progress(loaded: number, length: number): void {
    this.dispatchEvent(new TaskProgressEvent(loaded, length))
  }

  success(): void {
    this.dispatchEvent(new TaskSuccessEvent())
  }

  fail(): void {

  }

  get key(): string {
    return this._key
  }
}