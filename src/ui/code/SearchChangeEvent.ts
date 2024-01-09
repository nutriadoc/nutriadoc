export default class SearchChangeEvent extends Event {

  protected _search: string = ""

  public constructor(search: string) {
    super("change")
    this._search = search
  }

  public get search(): string {
    return this._search
  }
}