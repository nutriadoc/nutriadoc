export default class TaskFailEvent extends Event {

    protected _error: any

    constructor(error: any) {
      super("fail")
      this._error = error
    }

    get error(): any {
      return this._error
    }
}