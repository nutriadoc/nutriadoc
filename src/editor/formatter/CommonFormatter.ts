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
    'lineSpacing'
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
    console.debug("format", format, _params)

    // const range = this.quill.getSelection()

    const key = formatToKey(format).toLowerCase()
    this.quill.format(key, _params[0], "user")
  }

}