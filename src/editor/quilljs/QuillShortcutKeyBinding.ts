import ShortcutKeyBinding from "../shortcut_key/ShortcutKeyBinding.ts";
import Quill from "quill";
import QuillLinkBinding from "./QuillLinkBinding.ts";
import LinkSettings from "../../ui/link/LinkSettings.ts";

export default class QuillShortcutKeyBinding extends ShortcutKeyBinding {

  protected quill: Quill

  protected linkSettings: LinkSettings


  public constructor(quill: Quill) {
    super(quill.root)

    this.linkSettings = new LinkSettings()
    this.quill = quill
  }

  link(): void {
    QuillLinkBinding.create(this.quill)?.openLinkSettings()
  }

}