import ILinkBinding from "./ILinkBinding.ts";
import LinkSettings from "./LinkSettings.ts";
import LinkEvent from "../toolbar/inline/link/LinkEvent.ts";

export default abstract class LinkBinding implements ILinkBinding {

  protected _url: string = ""

  protected _text: string = ""

  protected settings?: LinkSettings


  abstract removeLink(): void

  abstract openLink(): void

  abstract closeInlineToolbar(): void

  public get url(): string {
    return this._url
  }

  public get text(): string {
    return this._text
  }

  public openLinkSettings() {

    console.debug(this)

    this.settings = new LinkSettings(this._url, this._text)
    this.settings?.addEventListener("hidden", this.onLinkSettingsHide.bind(this))
    this.settings?.addEventListener("change", this.onLinkSettingsChange.bind(this))

    this.settings?.visible()
  }

  protected onLinkSettingsHide() {
    this.hideSettingsHide()
  }

  protected hideSettingsHide(): void {

    this.settings?.removeEventListener("hidden", this.onLinkSettingsHide.bind(this))
    this.settings?.removeEventListener("change", this.onLinkSettingsChange.bind(this))
    this.settings?.remove()
    this.settings = undefined
  }

  protected onLinkSettingsChange(e: Event): void {
    const event = e as LinkEvent
    this._url = event.url
    this._text = event.text

    console.debug(this)
    this.settings = undefined
  }

  copyLink() {
    navigator
      .clipboard
      .writeText(this._url)
      .then(() => {
        console.debug("Success")
      })
      .catch(() => {
        console.debug("Failure")
      })
  }

}