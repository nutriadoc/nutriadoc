import Option from "../editor/Option.ts";
import {className} from "../ui/views.ts";
import AbstractDocument from "./AbstractDocument.ts";
import DocumentMutation from "../editor/DocumentMutation.ts";
import UserBehavior from "../editor/behavior/UserBehavior.ts";
import DocumentCommandEvent from "./commands/DocumentCommandEvent.ts";
import TypingCommand from "./commands/TypingCommand.ts";
import Command from "../editor/commands/Command.ts";

export default abstract class Document extends AbstractDocument {

  protected behavior: UserBehavior


  protected constructor(option?: Option) {
    super(option, undefined, className("ntr-doc", "ntr-editor"))

    this.behavior = this.createUserBehavior()
    this.setupElements(option)
    this.initialized()
  }

  setupElements(option?: Option) {
    this.createShortcutKeyBinding()
    this.createInlineToolbar()
    if (!!option?.collaboration) this.createCollaboration(option)

    this.addElement(this._editor)
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

  onTextChange(mutation: DocumentMutation, old: DocumentMutation) {
    const cmd = new TypingCommand(mutation, old)
    this.behavior.execute(cmd)
  }

  protected onCommand(event: DocumentCommandEvent) {
    this.behavior.execute(event.command)
  }
}