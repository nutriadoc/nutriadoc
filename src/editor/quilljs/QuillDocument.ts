import Quill from "quill";
import Document from "../../document/Document.ts";
import Option, {NutriaApiHost} from "../Option.ts";
import Collaboration from "../collaboration/Collaboration.ts";
import WebsocketCollaboration from "../collaboration/WebSocketCollaboration.ts";
import QuillEditor from "./QuillEditor.ts";
import {CollaborationOption, getCollaborationOption} from "../collaboration/CollaborationOption.ts"
import QuillServiceCollection from "./QuillServiceCollection.ts";

export default class QuillDocument extends Document {

  static _documents: WeakMap<any, Document> = new Map()

  public constructor(option?: Option) {
    const services = new QuillServiceCollection(option)
    super(services, option)

    const quillEditor = this.editor as QuillEditor
    const scroll = quillEditor.quill.scroll
    QuillDocument._documents.set(scroll, this)
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
      this.services.documentService(),
      this.quill,
      getCollaborationOption(NutriaApiHost, option),
    )

    this._insertTextQueue = []

    return collaboration
  }

  static getDocumentByScroll(scroll: any): Document {
    const document = this._documents.get(scroll)
    if (!document) throw new Error("Document not found")

    return document
  }

  protected get quill(): Quill {
    return (this._editor as QuillEditor).quill
  }
}