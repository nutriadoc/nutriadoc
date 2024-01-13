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
import Options from "./Options.ts";
import DOMEvents from "./ui/DOMEvents.ts";
import DocumentService from "./service/DocumentService.ts";
import DefaultDocumentService from "./service/DefaultDocumentService.ts";
import ContentLoaderTask from "./tasks/ContentLoaderTask.ts";
import DocumentLoadTask from "./tasks/DocumentLoadTask.ts";
import WebsocketCollaboration from "../editor/collaboration/WebSocketCollaboration.ts";

export default abstract class Document extends AbstractDocument {

  protected _behavior: UserBehavior

  protected _documentService: DocumentService = new DefaultDocumentService()

  protected constructor(option?: Option) {
    super(option, undefined, className("ntr-doc", "ntr-editor"))
    DOMEvents.setup()
    option = Options.setup(option)
    Lang.setup()

    this._behavior = this.createUserBehavior()
    this.setupElements(option).then(() => {})
  }

  async setupElements(option?: Option): Promise<void> {
    this.createShortcutKeyBinding()
    this.createInlineToolbar()



    await Page.setup(option)
    this.attachEditor()
    this.loadContent(option)
  }

  attachEditor() {
    this.addElement(this._editor)
  }

  protected async loadContent(option?: Option) {
    const collab = this.createCollaboration(option?.collaboration)
    const task = new ContentLoaderTask(option, this._documentService, collab)
    await task.start()
  }

  insertText(index: number, text: string, format?: any, value?: any) {
    this._editor.insertText(index, text, format, value)
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

  public get behavior(): UserBehavior {
    return this._behavior
  }
}