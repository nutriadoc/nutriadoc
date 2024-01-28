export default class LanguageEvent extends Event {

  protected _language: string

  constructor(language: string) {
    super("select")
    this._language = language
  }

  get language(): string {
    return this._language
  }
}