import Quill from "quill";
import Document from "../../document/Document.ts";
import Option from "../Option.ts";
import QuillEditor from "./QuillEditor.ts";
import QuillServiceCollection from "./QuillServiceCollection.ts";

export default class QuillDocument extends Document {

  public constructor(option?: Option) {
    const services = new QuillServiceCollection(option)
    super(services, option)

    const quillEditor = this.editor as QuillEditor
    const scroll = quillEditor.quill.scroll
    Document._documents.set(scroll, this)

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

  protected get quill(): Quill {
    return (this._editor as QuillEditor).quill
  }
}