import Quill from "quill";
import Document from "../../document/Document.ts";
import Option, {NutriaApiHost} from "../Option.ts";
import Collaboration from "../collaboration/Collaboration.ts";
import WebsocketCollaboration from "../collaboration/WebSocketCollaboration.ts";
import Editor from "../Editor.ts";
import QuillEditor from "./QuillEditor.ts";
import {CollaborationOption, getCollaborationOption} from "../collaboration/CollaborationOption.ts"
import QuillServiceCollection from "./QuillServiceCollection.ts";

export default class QuillDocument extends Document {

  public constructor(option?: Option) {
    const services = new QuillServiceCollection(option)
    super(services, option)
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

  createCollaboration(option?: CollaborationOption): Collaboration {
    const collaboration = new WebsocketCollaboration(
      [...this._insertTextQueue],
      this._documentService,
      this.quill,
      getCollaborationOption(NutriaApiHost, option),
    )

    this._insertTextQueue = []

    return collaboration
  }

  createEditor(): Editor {
    return new QuillEditor(this._option)
  }

  protected get quill(): Quill {
    return (this._editor as QuillEditor).quill
  }
}