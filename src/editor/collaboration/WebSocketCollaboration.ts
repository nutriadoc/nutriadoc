import { QuillBinding } from 'y-quill'
import * as Y from "yjs"
import { WebsocketProvider} from "y-websocket"
import Quill from "quill"
import Collaboration from "./Collaboration.ts"
import {CollaborationOption} from "./CollaborationOption.ts"
import Task from "../../ui/task/Task.ts";
import DocumentLoadTask from "../../document/tasks/DocumentLoadTask.ts";

export default class WebsocketCollaboration extends Task implements Collaboration {

  protected ydoc: Y.Doc

  protected quill: Quill

  protected provider!: WebsocketProvider

  protected binding!: QuillBinding

  protected option: CollaborationOption

  public constructor(quill: Quill, option: CollaborationOption) {
    super()

    this.ydoc = new Y.Doc()
    this.quill = quill
    this.option = option
  }

  protected async run(): Promise<void> {


    const docTask = this._parent?.find<DocumentLoadTask>(DocumentLoadTask.name)
    if (!docTask) return

    this.provider = new WebsocketProvider(
      this.option.ws,
      // 'ws://127.0.0.1:123',
      docTask.document!.id,
      this.ydoc
    )

    this.provider.on('status', this.onConnected.bind(this))
    this.provider.on('connection-error', this.onConnectionError.bind(this))

    const text = this.ydoc.getText("quill")

    this.binding = new QuillBinding(text, this.quill)
  }

  protected onConnected(option: any) {

    /**
     * @var 'connected'|'disconnected'
     */
    const {status} = option

    if (status == 'connected') {
      this.success()
    }

  }

  protected onConnectionError(e: any) {
    this.provider.disconnect()

    this.fail(e)
  }

}