import { Mime, KeyFile } from "@nutriadoc/classes"
import mime from "mime"

Mime.register(class MimeImpl extends Mime {
  getType(path: string): string {
    return mime.getType(path) || ""
  }
})

export default KeyFile