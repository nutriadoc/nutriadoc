import Command from "./commands/Command.ts";
import IFormatter from "./formatter/IFormatter.ts";
import { IView, Link } from "@nutriadoc/classes";
import Range from "./Range.ts";

export default interface Editor extends IView {

  createFormatter(): IFormatter

  get editorContent(): HTMLDivElement

  get editorElement(): HTMLElement

  getSelection(): Range

  getLength(): number

  getHtml(): string

  setHtml(html: string): void

  get html(): string

  set html(html: string)

  get height(): number

  set height(value: number)

  get contents(): any

  removeLink(range: Range): void

  getLink(range: Range): Link | undefined

  openLink(url: string): void

  changeLink(range: Range, link: Link): void

  insertLink(range: Range, link: Link): void

  insertEmbed(index: number, format: string, value: any): void
  insertEmbed(index: number, command: Command): void
  insertEmbed(index: number, command: Command | string, value?: any): void

  insertText(index: number, text: string, formats?: any, value?: any): any

  formatText(index: number, length: number, format: any): any
  formatText(index: number, length: number, format: string, value: any): any
  formatText(index: number, length: number, format: string | any, value?: any): any

  removeFormat(index: number, length: number): void

  setSelection(range: Range): void
  setSelection(index: number, length: number): void

  focus(): void

  get isEmpty(): boolean
}