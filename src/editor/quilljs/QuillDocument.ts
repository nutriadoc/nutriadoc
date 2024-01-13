import Quill from "quill";
import Document from "../../document/Document.ts";
import Option, {NutriaApiHost} from "../Option.ts";
import Collaboration from "../collaboration/Collaboration.ts";
import WebsocketCollaboration from "../collaboration/WebSocketCollaboration.ts";
import Editor from "../Editor.ts";
import QuillEditor from "./QuillEditor.ts";
import ShortcutKeyBinding from "../shortcut_key/ShortcutKeyBinding.ts";
import InlineToolbarBinding from "../toolbar/InlineToolbarBinding.ts";
import QuillShortcutKeyBinding from "./QuillShortcutKeyBinding.ts";
import {CollaborationOption, getCollaborationOption} from "../collaboration/CollaborationOption.ts";

export default class QuillDocument extends Document {

  public constructor(option?: Option) {
    super(option)
  }

  protected setupLoadEvent() {

    const observer = new MutationObserver(this.onMutation.bind(this))
    observer.observe(document.body, {childList: true, subtree: true})
  }

  protected onMutation(mutations: MutationRecord[]) {
    mutations.forEach((mutation) => {
      if (mutation.type == "childList") {
        mutation.addedNodes.forEach((node) => {
          this.onNodeInserted(node)
        })
      }
    })
  }

  createShortcutKeyBinding(): ShortcutKeyBinding {
    return new QuillShortcutKeyBinding(this.quill)
  }
  createInlineToolbar(): InlineToolbarBinding {
    return new InlineToolbarBinding(this.quill)
  }

  createCollaboration(option?: CollaborationOption): Collaboration {
    return new WebsocketCollaboration(
      this.quill,
      getCollaborationOption(NutriaApiHost, option),
    )
  }

  createEditor(): Editor {
    return new QuillEditor(this._option)
  }

  protected get quill(): Quill {
    return (this._editor as QuillEditor).quill
  }
}