import Quill from "quill"

const Block = Quill.import("blots/block")

export default abstract class AbstractTitle extends Block {
  static create(value: unknown) {
    const dom = super.create(value) as HTMLElement
    dom.classList.add(this.blotName)

    return dom
  }

  formats() {
    const blotName = this.statics.blotName.toLowerCase()
    if (this.domNode.classList.contains(blotName)) {
      const formats: any = {}
      formats[blotName] = true
      return formats
    }

    return { header: parseInt(this.domNode.tagName.substring(1)) }
  }
}