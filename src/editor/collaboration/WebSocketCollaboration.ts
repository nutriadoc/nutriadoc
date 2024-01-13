import { QuillBinding } from 'y-quill'
import * as Y from "yjs"
import { WebsocketProvider} from "y-websocket"
import Quill from "quill"
import Collaboration from "./Collaboration.ts"
import {CollaborationOption} from "./CollaborationOption.ts"

export default class WebsocketCollaboration implements Collaboration {

  protected ydoc: Y.Doc

  protected quill: Quill

  protected provider!: WebsocketProvider

  protected binding!: QuillBinding

  public constructor(quill: Quill, option: CollaborationOption, documentId: string) {

    this.ydoc = new Y.Doc()
    this.quill = quill
    this.provider = new WebsocketProvider(option.ws, documentId, this.ydoc)
    const text = this.ydoc.getText("quill")

    this.binding = new QuillBinding(text, this.quill)
  }

}