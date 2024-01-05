import Command from "./commands/Command.ts";
import IFormatter from "./formatter/IFormatter.ts";
import IView from "../ui/IView.ts";
import Range from "./Range.ts";

export default interface Editor extends IView {

  createFormatter(): IFormatter

  getSelection(): Range

  getLength(): number

  insertEmbed(index: number, format: string, value: any): void
  insertEmbed(index: number, command: Command): void
  insertEmbed(index: number, command: Command | string, value?: any): void

  insertText(index: number, text: string, formats?: any, value?: any): void

  formatText(index: number, length: number, format: any): void
  formatText(index: number, length: number, format: string, value: any): void
  formatText(index: number, length: number, format: string | any, value?: any): void

  removeFormat(index: number, length: number): void

  setSelection(index: number, length: number): void

  focus(): void
}