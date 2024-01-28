export default class OpenPromise<T> {

  public _resolve: Function | null = null

  public _reject: Function | null = null

  public promise: Promise<T>

  constructor() {
    let _resolve: Function | null = null
    let _reject: Function | null = null

    this.promise = new Promise<T>( (resolve, reject) => {
      _resolve = resolve
      _reject = reject
    })

    this._resolve = _resolve
    this._reject = _reject
  }

  public resolve(value?: T | PromiseLike<T>): void {
    if (this._resolve) {
      this._resolve(value)
    }
  }

  public reject(reason?: any): void {
    if (this._reject) {
      this._reject(reason)
    }
  }
}