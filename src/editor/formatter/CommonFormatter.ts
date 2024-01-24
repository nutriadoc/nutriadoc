import { StringMap } from "quill";
import AbstractFormatter from "./AbstractFormatter.ts";
import Format, {formatToKey} from "./Format.ts";

export default class CommonFormatter extends AbstractFormatter {

  readonly supportedFormats: string[] = [
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'color',
    'align',
    'background',
    'linespacing',
    'sub',
    'super',
  ]

  readonly supportedCommand: string[] = [
    'hr',
  ]

  public select(formats: StringMap): void {
    this.supportedFormats.forEach(format => {
      if (formats[format])
        super.active(format, formats[format])
      else
        super.deactive(format)
    })
  }

  public format(format: Format, ..._params: any[]): void {
    let formatKey = formatToKey(format)
    if (formatKey === undefined) return
    formatKey = formatKey.toLowerCase()

    if (this.supportedCommand.includes(formatKey)) {
      this.command(formatKey)
      return
    }

    if (!this.supportedFormats.includes(formatKey)) return

    this.quill.format(formatKey, _params[0], "user")
  }

  public command(command: string): void {
    if (!this.supportedCommand.includes(command)) return

    const range = this.quill.getSelection(true)
    if (range == null) return

    this.quill.insertText(range.index, '\n', { 'hr': true })
  }

}