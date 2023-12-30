import { QuillBinding } from 'y-quill'
import * as Y from "yjs"
import { WebsocketProvider} from "y-websocket"
import Quill from "quill";
import Option from "../Option.ts";

export default class WebsocketCollaboration {

  protected ydoc: Y.Doc

  protected quill: Quill

  protected provider: WebsocketProvider

  protected binding: QuillBinding

  public constructor (quill: Quill, option: Option) {
    if (!option.collaboration) throw new Error("Collaboration option is not set")
    if (!option.name) throw new Error("Name option is not set")

    this.ydoc = new Y.Doc()
    this.quill = quill
    this.provider = new WebsocketProvider(option.collaboration.ws, option.name, this.ydoc)
    const text = this.ydoc.getText("quill")
    this.binding = new QuillBinding(text, quill)
  }

}