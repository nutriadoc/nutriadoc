import * as m from "quill-delta-to-html/dist/commonjs/OpToHtmlConverter"

export class NewOpToHtmlConverter extends m.OpToHtmlConverter {
  getCssClasses() {
    return ["nutria", ...super.getCssClasses()]
  }
}