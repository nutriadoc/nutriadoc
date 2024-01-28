
import { StringMap } from "quill"
import AbstractFormatter from "./AbstractFormatter.ts"
import Format from "./Format.ts"

export default class ListFormatter extends AbstractFormatter {
  public select(formats: StringMap): void {
    const value = formats['list']
    if (!value) return

    if (['bullet', 'ordered'].includes(value))
      this.activeToolbarItem(value)
  }

  public format(format: Format, ..._params: any[]): void {
    if (format == Format.Bullet) {
      this.quill.format("list", "bullet")
    }

    if (format == Format.Numbered) {
      this.quill.format("list", "ordered")
    }
  }

}