import Option from "../editor/Option.ts";
import {className} from "../ui/views.ts";
import AbstractDocument from "./AbstractDocument.ts";
import DocumentMutation from "../editor/DocumentMutation.ts";
import UserBehavior from "../editor/behavior/UserBehavior.ts";
import DocumentCommandEvent from "./commands/DocumentCommandEvent.ts";
import TypingCommand from "./commands/TypingCommand.ts";
import Command from "../editor/commands/Command.ts";
import Lang from "../ui/lang/Lang.ts";
import Page from "../ui/Page.ts";
import DOMEvents from "./ui/DOMEvents.ts";
import DocumentService from "./service/DocumentService.ts";
import DefaultDocumentService from "./service/DefaultDocumentService.ts";
import ContentLoaderTask from "./tasks/ContentLoaderTask.ts";
import ReadyEvent from "./events/ReadyEvent.ts";
import DocumentStatus from "./DocumentStatus.ts";
import PackageManager from "../core/package/PackageManager.ts";
import Task from "../ui/task/Task.ts";
import NutriaLoadTask from "./tasks/NutriaLoadTask.ts";
import Editor from "../editor/Editor.ts";

export default abstract class Document extends AbstractDocument {

  protected _behavior: UserBehavior

  protected _documentService: DocumentService = new DefaultDocumentService()

  protected _status: DocumentStatus = DocumentStatus.Loading

  protected _insertTextQueue: any[] = []

  protected package: PackageManager = new PackageManager()

  protected didSetupSizeEvent: boolean = false

  protected _height: number = 0

  protected constructor(option?: Option) {
    super(option, undefined, className("nutria"))

    this.package.register(
      { name: "quill", version: "2.0.0-beta.0", },
      { name: "highlight.js", version: "11.9.0", },
      { name: "bootstrap-icons", version: "1.11.2", },
    )

    DOMEvents.setup()
    Lang.setup()
    this.setupSizeEvents()

    this._behavior = this.createUserBehavior()
    this.setupElements(option).then(() => {})
  }

  async setupElements(option?: Option): Promise<void> {
    this.createShortcutKeyBinding()
    this.createInlineToolbar()

    await Page.setup(option)


    const loadContent = this.loadContent(option)

    const loadTask = new NutriaLoadTask(this.package, loadContent, this._option)
    await loadTask.start()

    this.addElement(this.mainToolbar)
    this.attachEditor()

    this._status = DocumentStatus.Ready
    this.dispatchEvent(new ReadyEvent())
  }

  attachEditor() {
    this.addElement(this._editor)
  }

  protected loadContent(option?: Option): Task {
    const collaboration = this.createCollaboration(option?.collaboration)
    return new ContentLoaderTask(
      option,
      this._editor,
      this,
      this._documentService,
      collaboration
    )
  }

  insertText(index: number, text: string, format?: any, value?: any): any {
    if (this._status == DocumentStatus.Loading) {
      this._insertTextQueue.push({
        index,
        text,
        format,
        value
      })

      return
    }
    return this._editor.insertText(index, text, format, value)
  }

  insertEmbed(index: number, format: string, value: any): void
  insertEmbed(index: number, command: Command): void
  insertEmbed(index: number, command: Command | string, value?: any): void{
    this._editor.insertEmbed(index, command, value)
  }

  formatText(index: number, length: number, format: any): void
  formatText(index: number, length: number, format: string, value: any): void
  formatText(index: number, length: number, format: string | any, value?: any): void {
    this._editor.formatText(index, length, format, value)
  }

  removeFormat(index: number, length: number): void {
    this._editor.removeFormat(index, length)
  }

  setSelection(index: number, length: number): void {
    this._editor.setSelection(index, length)
  }

  focus(): void {
    this._editor.focus()
  }

  getLength(): number {
    return this._editor.getLength()
  }

  getHtml(): string {
    return this._editor.getHtml()
  }

  onTextChange(mutation: DocumentMutation, old: DocumentMutation) {
    const cmd = new TypingCommand(mutation, old)
    this._behavior.execute(cmd)
  }

  protected onCommand(event: DocumentCommandEvent) {
    this._behavior.execute(event.command)
  }

  setupSizeEvents() {

    const observer = new MutationObserver(_ => {
      if (this.didSetupSizeEvent) return
      this.setupHeight()
      this.didSetupSizeEvent = true

      this.resizingHeight()
    })
    observer.observe(this._element, {
      childList: true,
    })
  }

  resizingHeight() {
    const observer = new ResizeObserver(_ => {
      this.setupHeight()
    })
    observer.observe(this._element.parentElement!)
  }

  resizeHeight() {
    if (this._height > 0) {
      this._element.style.height = `${this._height}px`
      this.editor.height = this._height - 40
    }
  }

  setupHeight() {
    const height = this._option?.height
    if (!height) return

    const containerHeight = this._element.parentElement?.offsetHeight ?? 0

    if (typeof height == 'number') {
      if (height < 5) {
        // TODO: ratio of width , e.g 4 / 3
      }
    }

    if (typeof height == "string") {
      if (height.endsWith("%")) {
        let percent = parseInt(height)
        percent = 100
        percent = percent / 100

        this._height = containerHeight * percent
      }

      if (height.endsWith("px")) {
        this._height = parseInt(height)
      }

      // TODO: em, rem, vw, vh
    }

    this.resizeHeight()
  }

  public get behavior(): UserBehavior {
    return this._behavior
  }

  public get status(): DocumentStatus {
    return this._status
  }

  public set status(value: DocumentStatus) {
    this._status = value
  }

  public get editor(): Editor {
    return this._editor
  }
}