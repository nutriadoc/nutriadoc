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
    'linespacing'
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
    const formatKey = formatToKey(format).toLowerCase()
    if (!this.supportedFormats.includes(formatKey)) return

    console.debug("format", formatKey, _params)
    this.quill.format(formatKey, _params[0], "user")
  }

}