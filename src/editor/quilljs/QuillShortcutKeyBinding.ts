import ShortcutKeyBinding from "../shortcut_key/ShortcutKeyBinding.ts";
import Quill from "quill";
import QuillLinkBinding from "./QuillLinkBinding.ts";

export default class QuillShortcutKeyBinding extends ShortcutKeyBinding {

  protected quill: Quill

  public constructor(quill: Quill) {
    super(quill.root)

    this.quill = quill
  }

  link(): void {
    const binding = new QuillLinkBinding(this.quill)
    binding.openLink()
  }

}