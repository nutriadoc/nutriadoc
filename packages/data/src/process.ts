import {DeltaInsertOp} from "quill-delta-to-html";

export function processFormat(_customOp: DeltaInsertOp, _contextOp: DeltaInsertOp): string {
  return "";
}

export function processTag(_format: string, op: DeltaInsertOp): string | void {
  if (op.attributes.title) {
    return "h1"
  }
  if (op.attributes.subtitle) {
    return "h2"
  }
}

export function processAttribute(_op: DeltaInsertOp): { [key: string]: string } | void {

}

export function processClass(op: DeltaInsertOp): string | string[] | void {
  if (op.attributes.title) {
    return `title`
  }

  if (op.attributes.subtitle) {
    return `subtitle`
  }
}

export function processStyles(op: DeltaInsertOp): string | string[] | void {
  const styles: string[] = []
  if (!!op.attributes.size) {
    /**
     * @var {number} size - font size in pt
     */
    let size: number = 11
    try {
      size = parseInt(op.attributes.size)
    } catch(e) {
      console.warn(e)
    }
    size *= 1.3333 // 1.33px = 1pt
    styles.push(`font-size: ${size.toFixed(2)}px`)
  }

  return styles
}