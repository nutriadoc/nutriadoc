import {QuillDeltaToHtmlConverter} from "quill-delta-to-html";
import {processClass, processFormat, processStyles, processTag} from "./process.ts";

export function deltaToHtml(delta: any[]) {

  delta.forEach(d => {
    if (d.attributes && ('title' in d.attributes || 'subtitle' in d.attributes)) {
      d.attributes['renderAsBlock'] = true
    }
  })

  const converter = new QuillDeltaToHtmlConverter(
    delta,
    {
      customCssStyles: processStyles,
      customTag: processTag,
      customCssClasses: processClass,
    }
  )



  converter.renderCustomWith(processFormat)

  return converter.convert()
}