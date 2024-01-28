import AbstractFormatter from "./AbstractFormatter.ts"
import Format from "./Format.ts"
import {StringMap} from "quill"
import LinkSettings from "../../ui/link/LinkSettings.ts";

export default class LinkFormatter extends AbstractFormatter {

  protected linkSettingHiddenHandler = this.onLinkSettingHidden.bind(this)

  format(format: Format, ..._: any[]): void {
    if (format !== Format.Link) {
      return
    }

    this.openInsertLink()
  }

  public openInsertLink() {
    const linkSetting = new LinkSettings(this.editor, this.editor.getSelection())
    linkSetting.addEventListener('hidden', this.linkSettingHiddenHandler)
    linkSetting.visible()
  }

  select(_: StringMap): void {
  }

  protected onLinkSettingHidden(e: Event) {
    const linkSetting = e.target as LinkSettings
    linkSetting.removeEventListener('hidden', this.linkSettingHiddenHandler)
    linkSetting.dispose()
  }

}