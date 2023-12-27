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
  ]

  public select(formats: StringMap): void {
    this.supportedFormats.forEach(format => {
      if (formats[format])
        super.active(format)
      else
        super.deactive(format)
    })
  }

  public format(format: Format, ..._params: any[]): void {
    console.debug("format", format)
    const key = formatToKey(format).toLowerCase()
    this.quill.format(key, _params[0], "user")
  }

}