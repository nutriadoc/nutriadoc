export default class LinkEvent extends Event {
  protected _url: string

  protected _text: string

  public constructor(url: string, text: string) {
    super("change")

    this._url = url
    this._text = text
  }

  public get url(): string {
    return this._url
  }

  public get text(): string {
    return this._text
  }
}