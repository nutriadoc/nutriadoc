import IDisposable from "../../core/IDisposable.ts";
import Editor from "../Editor.ts";
import LinkSettings from "../../ui/link/LinkSettings.ts";


export default class ShortcutKeyBinding implements IDisposable {

  protected node: Node

  protected editor: Editor

  protected onKeydownHandler: (e: Event) => boolean

  protected linkSettingHiddenHandler = this.onLinkSettingHidden.bind(this)

  public constructor(node: Node, editor: Editor) {
    this.node = node
    this.editor = editor

    this.onKeydownHandler = this.onKeydown.bind(this)
    node.addEventListener("keydown", this.onKeydownHandler)
  }

  protected onKeydown(e: Event) {
    const event = e as KeyboardEvent
    if (event.key.toUpperCase() == "K" && event.ctrlKey) {
      e.preventDefault()
      e.stopPropagation()

      const linkSetting = new LinkSettings(this.editor, this.editor.getSelection())
      linkSetting.addEventListener('hidden', this.linkSettingHiddenHandler)
      linkSetting.visible()

      return false
    }

    return true
  }

  protected onLinkSettingHidden(e: Event) {
    const linkSetting = e.target as LinkSettings
    linkSetting.removeEventListener('hidden', this.linkSettingHiddenHandler)
    linkSetting.dispose()
  }

  dispose(): void {
    this.node.removeEventListener("keydown", this.onKeydownHandler)
  }
}