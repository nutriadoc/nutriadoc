import { QuillBinding } from 'y-quill'
import * as Y from "yjs"
import { WebsocketProvider} from "y-websocket"
import Quill from "quill"
import Collaboration from "./Collaboration.ts"
import {CollaborationOption} from "./CollaborationOption.ts"
import Task from "../../ui/task/Task.ts";
import DocumentLoadTask from "../../document/tasks/DocumentLoadTask.ts";
import {delay} from "../../core/Time.ts";
import OpenPromise from "../../ui/task/OpenPromise.ts";
import QuillCursors from "quill-cursors";
import DocumentService from "../../document/service/DocumentService.ts";

Quill.register('modules/cursors', QuillCursors)

export default class WebsocketCollaboration extends Task implements Collaboration {

  protected ydoc: Y.Doc

  protected text!: Y.Text

  protected quill: Quill

  protected provider!: WebsocketProvider

  protected binding!: QuillBinding

  protected option: CollaborationOption

  protected ops: any[] = []

  protected running: OpenPromise<void> = new OpenPromise<void>()

  protected documentService: DocumentService

  public constructor(ops: any[], documentService: DocumentService,  quill: Quill, option: CollaborationOption) {
    super()

    this.ops = ops
    this.ydoc = new Y.Doc()
    this.quill = quill
    this.option = option
    this.documentService = documentService
  }

  protected async run(): Promise<void> {


    const docTask = this._parent?.find<DocumentLoadTask>(DocumentLoadTask.name)
    if (!docTask) return Promise.resolve()

    this.provider = new WebsocketProvider(
      this.option.ws,
      // 'ws://127.0.0.1:123',
      docTask.document!.id,
      this.ydoc
    )

    const user = await this.documentService.getUser()

    const awareness = this.provider.awareness

    awareness.setLocalStateField('user', {
      name: user.name,
      color: user.color
    })

    this.provider.on('status', this.onConnected.bind(this))
    this.provider.on('connection-error', this.onConnectionError.bind(this))

    this.text =  this.ydoc.getText("quill")
    this.binding = new QuillBinding(this.text, this.quill, awareness)

    return this.running.promise

  }

  protected async onConnected(option: any) {

    /**
     * @var 'connected'|'disconnected'
     */
    const {status} = option

    if (status == 'connected') {
      await delay(100)
      this.loadDelta()

      this.quill.history.clear()
      this.success()
    }

  }

  protected loadDelta() {

    const delta = this.text!.toDelta()
    if (delta.length > 0) return

    if (this.ops.length == 0) return

    this.ops.forEach(op => {
      this.quill.insertText(
        op.index,
        op.text,
        op.format,
        op.value
      )
    })
  }

  protected onConnectionError(e: any) {
    this.provider.disconnect()

    this.fail(e)
  }

  success() {
    this.running.resolve()
    super.success();
  }

  fail(e?: any) {
    this.running.reject(e)
    super.fail(e);
  }

}