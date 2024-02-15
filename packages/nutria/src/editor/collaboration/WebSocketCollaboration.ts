import { QuillBinding } from 'y-quill'
import * as Y from "yjs"
import { WebsocketProvider} from "y-websocket"
import Quill from "quill"
import Collaboration from "./Collaboration.ts"
import {CollaborationOption} from "./CollaborationOption.ts"
import Task from "../../ui/task/Task.ts";
import DocumentLoadTask from "../../document/tasks/DocumentLoadTask.ts";
import OpenPromise from "../../ui/task/OpenPromise.ts";
import QuillCursors from "quill-cursors";
import QuillDocument from "../quilljs/QuillDocument.ts";
import QuillEditor from "../quilljs/QuillEditor.ts";
import Document from "../../document/Document.ts";
import Delta from "quill-delta";
import {randomColor} from "@/ui/color_picker/Colors.ts";
import {DocumentService} from "@nutriadoc/service";

Quill.register('modules/cursors', QuillCursors)

export default class WebsocketCollaboration extends Task implements Collaboration {

  protected document: Document

  protected ydoc: Y.Doc

  protected text!: Y.Text

  protected quill: Quill

  protected provider!: WebsocketProvider

  protected binding!: QuillBinding

  protected option: CollaborationOption

  protected running: OpenPromise<void> = new OpenPromise<void>()

  protected documentService: DocumentService

  delta: Delta

  public constructor(doc: QuillDocument, option: CollaborationOption) {
    super()

    this.document = doc
    this.ydoc = doc.ydoc
    this.text = doc.yText
    this.quill = (doc.editor as QuillEditor).quill
    this.option = option
    this.documentService = doc.services.documentService()

    this.delta = this.delta = this.quill.getContents()
    if (!!this.document.option) {
      this.document.option.delta = this.delta
    }
  }

  protected async run(): Promise<void> {
    this.applyInitializeContents()

    const docTask = this._parent?.find<DocumentLoadTask>(DocumentLoadTask.name)
    if (!docTask) return Promise.resolve()

    if (undefined == docTask.data) {
      this.success()
      return Promise.resolve()
    }

    this.provider = new WebsocketProvider(
      this.option.ws,
      // 'ws://127.0.0.1:123',
      docTask.data!.id,
      this.ydoc
    )

    const user = await this.documentService.getUser()
    user.color = randomColor()

    const awareness = this.provider.awareness

    awareness.setLocalStateField('user', {
      name: user.name,
      color: user.color
    })

    this.provider.on('status', this.onConnected.bind(this))
    this.provider.on('connection-error', this.onConnectionError.bind(this))

    this.binding = new QuillBinding(this.text, this.quill, awareness)

    return this.running.promise

  }

  protected applyInitializeContents() {
    const ob = (e: Y.YTextEvent) => {
      const empty = !e.delta.some(d => typeof d.insert === 'string' ? d.insert.trim() != "" : false)
      if (empty) {
        this.quill.updateContents(this.delta)
      }
      this.text.unobserve(ob)
    }
    this.text.observe(ob)
  }


  protected async onConnected(option: any) {

    /**
     * @var 'connected'|'disconnected'
     */
    const {status} = option
    // console.debug('status', status)

    if (status == 'connected') {
      this.success()
    }

  }

  protected onConnectionError(e: any) {
    this.provider.disconnect()

    this.fail(e)
  }

  success() {
    this.quill.history.clear()

    this.running.resolve()
    super.success();
  }

  fail(e?: any) {
    this.running.reject(e)
    super.fail(e);
  }

}