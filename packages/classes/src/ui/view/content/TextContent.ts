import Content from "./Content.ts";

export default class TextContent extends Content {

  protected _text: string = ""

  public constructor(text: string) {
    super()
    this._text = text
  }

  public get text(): string {
    return this._text
  }
}